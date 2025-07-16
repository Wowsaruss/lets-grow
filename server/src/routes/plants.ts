import express from 'express';
import db from '../db';
import { keysToCamel, keysToSnake } from '../helpers/case';
import { checkJwt, attachUser } from '../middleware/auth';
import { Request } from '../types/express';

const router = express.Router();

// Helper to check for valid YYYY-MM-DD date
function isValidDateString(dateStr: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return false;
  const [year, month, day] = dateStr.split('-').map(Number);
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() + 1 === month &&
    date.getUTCDate() === day
  );
}

// Get all plants
router.get('/', checkJwt, attachUser, async (req: Request, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
    const growingZoneId = req.user.growing_zone_id;
    if (!growingZoneId) {
      return res.status(400).json({ error: 'User does not have a growing zone set' });
    }

    // Get all plants
    const plants = await db('plants').select('*');
    const plantIds = plants.map(p => p.id);

    // Get green thumb votes for all plants in the user's growing zone
    const greenThumbs = await db('green_thumbs')
      .select(
        'plant_growing_zone_details.plant_id',
        db.raw('SUM(CASE WHEN green_thumbs.up THEN 1 ELSE 0 END) as green_thumbs_up'),
        db.raw('SUM(CASE WHEN green_thumbs.up = false THEN 1 ELSE 0 END) as green_thumbs_down')
      )
      .join('plant_growing_zone_details', 'green_thumbs.plant_growing_zone_detail_id', 'plant_growing_zone_details.id')
      .whereIn('plant_growing_zone_details.plant_id', plantIds)
      .andWhere('plant_growing_zone_details.growing_zone_id', growingZoneId)
      .groupBy('plant_growing_zone_details.plant_id');

    // Map plant_id to green thumb counts
    const thumbsMap = greenThumbs.reduce((acc, row) => {
      acc[row.plant_id] = {
        greenThumbsUp: Number(row.green_thumbs_up) || 0,
        greenThumbsDown: Number(row.green_thumbs_down) || 0,
      };
      return acc;
    }, {} as Record<number, { greenThumbsUp: number; greenThumbsDown: number }>);

    // Attach green thumb data to each plant
    const plantsWithThumbs = plants.map(plant => ({
      ...plant,
      ...thumbsMap[plant.id] || { greenThumbsUp: 0, greenThumbsDown: 0 }
    }));

    res.json(keysToCamel(plantsWithThumbs));
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

// AI-powered plant creation endpoint
router.post('/ai-generate', checkJwt, attachUser, async (req: Request, res) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden: Only admin users can use AI plant creation' });
    }
    const { commonName, variety } = req.body;
    if (!commonName || !variety) {
      return res.status(400).json({ error: 'commonName and variety are required' });
    }

    // 1. Use AI to generate plant data (now returns plant_family_name and plant_type_name)
    const plantData = await req.app.locals.ai.generatePlantData(commonName, variety);

    // 2. Look up plant_family_id from plant_family_name
    const familyName = plantData.plant_family_name;
    if (!familyName) {
      plantData.plant_family_id = null;
    } else {
      const family = await db('plant_families').where({ name: familyName }).first();
      if (!family) {
        plantData.plant_family_id = null;
      } else {
        plantData.plant_family_id = family.id;
      }
    }
    delete plantData.plant_family_name;

    // 3. Look up plant_type_id from plant_type_name
    const typeName = plantData.plant_type_name;
    if (!typeName) {
      plantData.plant_type_id = null;
    } else {
      const type = await db('plant_types').where({ name: typeName }).first();
      if (!type) {
        plantData.plant_type_id = null;
      } else {
        plantData.plant_type_id = type.id;
      }
    }
    delete plantData.plant_type_name;

    // 4. Insert plant
    const [plant] = await db('plants').insert(plantData).returning('*');

    // 5. Fetch all growing zones
    const growingZones = await db('growing_zones').select('id', 'zone');

    // 6. For each zone, use AI to generate growing zone details (placeholder)
    const zoneDetails = await Promise.all(growingZones.map(async (zone) => {
      const details = await req.app.locals.ai.generateZoneDetails(commonName, variety, zone.zone);
      // Remove green_thumbs if present
      if ('green_thumbs' in details) {
        delete details.green_thumbs;
      }
      // Sanitize date fields: convert 'N/A', 'None', or '' to null
      const dateFields = [
        'spring_start_indoors',
        'spring_start_outdoors',
        'spring_transplant',
        'fall_start_indoors',
        'fall_start_outdoors',
        'fall_transplant',
        'last_day_to_plant',
      ];
      for (const field of dateFields) {
        const value = details[field];
        if (
          value === 'N/A' ||
          value === 'None' ||
          value === '' ||
          (typeof value === 'string' && !isValidDateString(value))
        ) {
          details[field] = null;
        }
      }
      return {
        plant_id: plant.id,
        growing_zone_id: zone.id,
        ...details,
        created_at: new Date(),
        updated_at: new Date(),
      };
    }));

    // 7. Insert all plant_growing_zone_details
    await db('plant_growing_zone_details').insert(zoneDetails);

    // 8. Return the created plant and its growing zone details
    res.status(201).json({ plant, growingZoneDetails: zoneDetails });
  } catch (error) {
    console.error('Error in AI plant creation:', error);
    res.status(500).json({ error: 'Failed to create plant with AI' });
  }
});

export default router; 