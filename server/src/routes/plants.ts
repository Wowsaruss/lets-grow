import express from 'express';
import db from '../db';
import { keysToCamel, keysToSnake } from '../helpers/case';
import { checkJwt, attachUser } from '../middleware/auth';
import { Request } from '../types/express';

const router = express.Router();

// Get all plants
router.get('/', async (req, res) => {
  try {
    const plants = await db('plants').select('*');
    res.json(keysToCamel(plants));
  } catch (error) {
    console.error('Error fetching plants:', error)
    res.status(500).json({ error: 'Failed to fetch plants' });
  }
});

// Get plants for authenticated user (requires authentication)
router.get('/user/:userId', checkJwt, attachUser, async (req: Request, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const { userId } = req.params;

    // Ensure user can only access their own plants
    if (String(userId) !== String(req.user.id)) {
      return res.status(403).json({ error: 'Forbidden: You can only access your own plants' });
    }

    // Join plants with user_plants to get only plants that belong to this user
    const userPlants = await db('plants')
      .select('plants.*')
      .join('user_plants', 'plants.id', 'user_plants.plant_id')
      .where('user_plants.user_id', userId)
      .whereNull('user_plants.deleted_at');

    // Get user's green thumb votes
    const userVotes = await db('green_thumbs')
      .select('green_thumbs.up', 'plants.id as plant_id')
      .join('plant_growing_zone_details', 'green_thumbs.plant_growing_zone_detail_id', 'plant_growing_zone_details.id')
      .join('plants', 'plant_growing_zone_details.plant_id', 'plants.id')
      .where('green_thumbs.user_id', userId);

    // Create a map of plant_id to vote
    const voteMap = userVotes.reduce((acc, vote) => {
      acc[vote.plant_id] = vote.up;
      return acc;
    }, {} as Record<string, boolean>);

    // Add vote information to each plant
    const plantsWithVotes = userPlants.map(plant => ({
      ...plant,
      userVote: voteMap[plant.id] !== undefined ? voteMap[plant.id] : null
    }));

    res.json(keysToCamel(plantsWithVotes));
  } catch (error) {
    console.error('Error fetching user plants:', error)
    res.status(500).json({ error: 'Failed to fetch user plants' });
  }
});

// Get plant by ID
router.get('/:id', async (req, res) => {
  try {
    const plant = await db('plants').where({ id: req.params.id }).first();
    if (!plant) {
      return res.status(404).json({ error: 'Plant not found' });
    }
    res.json(keysToCamel(plant));
  } catch (error) {
    console.error('Error fetching plant:', error)
    res.status(500).json({ error: 'Failed to fetch plant' });
  }
});

// Create new plant
router.post('/', checkJwt, attachUser, async (req: Request, res) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden: Only admin users can create plants' });
    }
    const snakeCaseBody = keysToSnake(req.body);
    const [plant] = await db('plants').insert(snakeCaseBody).returning('*');
    res.status(201).json(keysToCamel(plant));
  } catch (error) {
    console.error('Error creating plant:', error)
    res.status(500).json({ error: 'Failed to create plant' });
  }
});

// Update plant
router.put('/:id', checkJwt, attachUser, async (req: Request, res) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden: Only admin users can update plants' });
    }
    const snakeCaseBody = keysToSnake(req.body);
    const [plant] = await db('plants')
      .where({ id: req.params.id })
      .update(snakeCaseBody)
      .returning('*');

    if (!plant) {
      return res.status(404).json({ error: 'Plant not found' });
    }
    res.json(keysToCamel(plant));
  } catch (error) {
    console.error('Error updating plant:', error)
    res.status(500).json({ error: 'Failed to update plant' });
  }
});

// Delete plant
router.delete('/:id', checkJwt, attachUser, async (req: Request, res) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden: Only admin users can delete plants' });
    }
    const deleted = await db('plants').where({ id: req.params.id }).delete();
    if (!deleted) {
      return res.status(404).json({ error: 'Plant not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting plant:', error)
    res.status(500).json({ error: 'Failed to delete plant' });
  }
});

// Get user's green thumb votes
router.get('/green-thumbs', checkJwt, attachUser, async (req: Request, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
    const userId = req.user.id;

    // Get all green thumb votes for this user
    const votes = await db('green_thumbs')
      .select('green_thumbs.*', 'plants.common_name as plant_name')
      .join('plant_growing_zone_details', 'green_thumbs.plant_growing_zone_detail_id', 'plant_growing_zone_details.id')
      .join('plants', 'plant_growing_zone_details.plant_id', 'plants.id')
      .where('green_thumbs.user_id', userId);

    res.json(keysToCamel(votes));
  } catch (error) {
    console.error('Error fetching green thumb votes:', error);
    res.status(500).json({ error: 'Failed to fetch green thumb votes' });
  }
});

// Green Thumb endpoint
router.post('/green-thumb/:plant_id', checkJwt, attachUser, async (req: Request, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
    const plantId = parseInt(req.params.plant_id, 10);
    const { up } = req.body; // true for upvote, false for downvote
    const userId = req.user.id;
    const growingZoneId = req.user.growing_zone_id;

    if (!growingZoneId) {
      return res.status(400).json({ error: 'User does not have a growing zone set' });
    }

    // Find the plant_growing_zone_details record for this plant and user's growing zone
    const plantGrowingZoneDetail = await db('plant_growing_zone_details')
      .where({ plant_id: plantId, growing_zone_id: growingZoneId })
      .first();

    if (!plantGrowingZoneDetail) {
      return res.status(404).json({ error: 'No growing zone details found for this plant in your zone' });
    }

    // Check if user already voted on this plant/growing zone combination
    const existingVote = await db('green_thumbs')
      .where({ user_id: userId, plant_growing_zone_detail_id: plantGrowingZoneDetail.id })
      .first();

    if (existingVote) {
      // Update existing vote
      const updated = await db('green_thumbs')
        .where({ user_id: userId, plant_growing_zone_detail_id: plantGrowingZoneDetail.id })
        .update({ up })
        .returning('*');
      res.json(keysToCamel(updated[0]));
    } else {
      // Create new vote
      const newVote = await db('green_thumbs')
        .insert({ user_id: userId, plant_growing_zone_detail_id: plantGrowingZoneDetail.id, up })
        .returning('*');
      res.status(201).json(keysToCamel(newVote[0]));
    }
  } catch (error) {
    console.error('Error processing green thumb vote:', error);
    res.status(500).json({ error: 'Failed to process green thumb vote' });
  }
});

export default router; 