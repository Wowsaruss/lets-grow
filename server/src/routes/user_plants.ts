import express from 'express';
import db from '../db';
import { keysToCamel } from '../helpers/case';

const router = express.Router();

// Get all user_plants (optionally filter by user_id or plant_id)
router.get('/', async (req, res) => {
    try {
        const { user_id, plant_id } = req.query;
        let query = db('user_plants').whereNull('deleted_at');
        if (user_id) query = query.andWhere('user_id', user_id);
        if (plant_id) query = query.andWhere('plant_id', plant_id);
        const userPlants = await query.select('*');
        res.json(keysToCamel(userPlants));
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch user plants' });
    }
});

// Get a single user_plant by id
router.get('/:id', async (req, res) => {
    try {
        const userPlant = await db('user_plants')
            .where({ id: req.params.id })
            .whereNull('deleted_at')
            .first();
        if (!userPlant) {
            return res.status(404).json({ error: 'User plant not found' });
        }
        res.json(keysToCamel(userPlant));
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch user plant' });
    }
});

// Create a new user_plant
router.post('/', async (req, res) => {
    try {
        const now = new Date();
        const [userPlant] = await db('user_plants')
            .insert({
                ...req.body,
                created_at: now,
                updated_at: now,
            })
            .returning('*');
        res.status(201).json(keysToCamel(userPlant));
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to create user plant' });
    }
});

// Update a user_plant
router.put('/:id', async (req, res) => {
    try {
        const now = new Date();
        const [userPlant] = await db('user_plants')
            .where({ id: req.params.id })
            .whereNull('deleted_at')
            .update({ ...req.body, updated_at: now })
            .returning('*');
        if (!userPlant) {
            return res.status(404).json({ error: 'User plant not found' });
        }
        res.json(keysToCamel(userPlant));
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to update user plant' });
    }
});

// Soft delete a user_plant
router.delete('/:id', async (req, res) => {
    try {
        const now = new Date();
        const [userPlant] = await db('user_plants')
            .where({ id: req.params.id })
            .whereNull('deleted_at')
            .update({ deleted_at: now, updated_at: now })
            .returning('*');
        if (!userPlant) {
            return res.status(404).json({ error: 'User plant not found' });
        }
        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to delete user plant' });
    }
});

export default router; 