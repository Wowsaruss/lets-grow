import express from 'express';
import db from '../db';
import { keysToCamel } from '../helpers/case';
import { checkJwt, attachUser } from '../middleware/auth';
import { Request } from '../types/express';

const router = express.Router();

// Get all plants
router.get('/', async (req, res) => {
  try {
    const plants = await db('plants').select('*');
    res.json(keysToCamel(plants));
  } catch (error) {
    console.log(error)
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

    res.json(keysToCamel(userPlants));
  } catch (error) {
    console.log(error)
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
    console.log(error)
    res.status(500).json({ error: 'Failed to fetch plant' });
  }
});

// Create new plant
router.post('/', async (req, res) => {
  try {
    const [plant] = await db('plants').insert(req.body).returning('*');
    res.status(201).json(keysToCamel(plant));
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to create plant' });
  }
});

// Update plant
router.put('/:id', async (req, res) => {
  try {
    const [plant] = await db('plants')
      .where({ id: req.params.id })
      .update(req.body)
      .returning('*');

    if (!plant) {
      return res.status(404).json({ error: 'Plant not found' });
    }
    res.json(keysToCamel(plant));
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to update plant' });
  }
});

// Delete plant
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await db('plants').where({ id: req.params.id }).delete();
    if (!deleted) {
      return res.status(404).json({ error: 'Plant not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to delete plant' });
  }
});

export default router; 