import express from 'express';
import db from '../db';
import { keysToCamel } from '../helpers/case';
import { checkJwt, attachUser } from '../middleware/auth';

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

// Create new plant (admin only)
router.post('/', checkJwt, attachUser, async (req: any, res) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Only admin users can add plants' });
    }
    const [plant] = await db('plants').insert(req.body).returning('*');
    res.status(201).json(keysToCamel(plant));
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to create plant' });
  }
});

// Update plant (admin only)
router.put('/:id', checkJwt, attachUser, async (req: any, res) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Only admin users can update plants' });
    }
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

// Delete plant (admin only)
router.delete('/:id', checkJwt, attachUser, async (req: any, res) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Only admin users can delete plants' });
    }
    const deleted = await db('plants')
      .where({ id: req.params.id })
      .del();

    if (!deleted) {
      return res.status(404).json({ error: 'Plant not found' });
    }
    res.json({ success: true });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to delete plant' });
  }
});

export default router; 