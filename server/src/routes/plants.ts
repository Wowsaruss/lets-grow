import express from 'express';
import db from '../db';
import { keysToCamel, keysToSnake } from '../helpers/case';
import { checkJwt, attachUser } from '../middleware/auth';
import { Request } from '../types/express';
import isValidDateString from '../helpers/isValidDateString';
import plantsController from '../controllers/plants';

const router = express.Router();

router.get('/', checkJwt, attachUser, plantsController.getAllPlants);
router.get('/user/:userId', checkJwt, attachUser, plantsController.getAllUserPlants);
router.get('/:id', plantsController.getPlant);
router.post('/', checkJwt, attachUser, plantsController.createPlant);
router.put('/:id', checkJwt, attachUser, plantsController.updatePlant);
router.delete('/:id', checkJwt, attachUser, plantsController.deletePlant);
router.post('/ai-generate', checkJwt, attachUser, plantsController.aiPlantGen);

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