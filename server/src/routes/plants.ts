import express from 'express';
import db from '../db';

const router = express.Router();

// Get all plants
router.get('/', async (req, res) => {
  try {
    const plants = await db('plants').select('*');
    res.json(plants);
  } catch (error) {
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
    res.json(plant);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch plant' });
  }
});

// Create new plant
router.post('/', async (req, res) => {
  try {
    const [plant] = await db('plants').insert(req.body).returning('*');
    res.status(201).json(plant);
  } catch (error) {
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
    res.json(plant);
  } catch (error) {
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
    res.status(500).json({ error: 'Failed to delete plant' });
  }
});

export default router; 