import express from 'express';
import db from '../db';
import { keysToCamel } from '../helpers/case';
import { checkJwt, attachUser } from '../middleware/auth';
import { Request } from '../types/express';

const router = express.Router();

// Apply authentication to all routes
router.use(checkJwt);
router.use(attachUser);

// Get all user_plants (optionally filter by user_id or plant_id)
router.get('/', async (req: Request, res) => {
    try {
        const { user_id, plant_id } = req.query;
        let query = db('user_plants').whereNull('deleted_at');

        // Ensure user is authenticated
        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        // If user_id is provided, ensure it matches the authenticated user
        if (user_id) {
            const userIdStr = String(user_id);
            if (userIdStr !== String(req.user.id)) {
                return res.status(403).json({ error: 'Forbidden: You can only access your own user plants' });
            }
            query = query.andWhere('user_id', userIdStr);
        } else {
            // If no user_id provided, only show the authenticated user's plants
            query = query.andWhere('user_id', req.user.id);
        }

        if (plant_id) query = query.andWhere('plant_id', plant_id);
        const userPlants = await query.select('*');
        res.json(keysToCamel(userPlants));
    } catch (error) {
        console.error('Error fetching user plants:', error);
        res.status(500).json({ error: 'Failed to fetch user plants' });
    }
});

// Get a single user_plant by id
router.get('/:id', async (req: Request, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        const userPlant = await db('user_plants')
            .where({ id: req.params.id })
            .whereNull('deleted_at')
            .first();

        if (!userPlant) {
            return res.status(404).json({ error: 'User plant not found' });
        }

        // Ensure user can only access their own user_plants
        if (String(userPlant.user_id) !== String(req.user.id)) {
            return res.status(403).json({ error: 'Forbidden: You can only access your own user plants' });
        }

        res.json(keysToCamel(userPlant));
    } catch (error) {
        console.error('Error fetching user plant:', error);
        res.status(500).json({ error: 'Failed to fetch user plant' });
    }
});

// Create a new user_plant
router.post('/', async (req: Request, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        const now = new Date();

        // Convert camelCase to snake_case for database columns
        const userPlantData = {
            user_id: req.user.id, // Always use authenticated user's ID
            plant_id: req.body.plantId || req.body.plant_id, // Handle both camelCase and snake_case
            currently_growing: req.body.currentlyGrowing || req.body.currently_growing || true,
            grow_again: req.body.growAgain || req.body.grow_again || true,
            created_at: now,
            updated_at: now,
        };

        const [userPlant] = await db('user_plants')
            .insert(userPlantData)
            .returning('*');
        res.status(201).json(keysToCamel(userPlant));
    } catch (error) {
        console.error('Error creating user plant:', error);
        res.status(500).json({ error: 'Failed to create user plant' });
    }
});

// Update a user_plant
router.put('/:id', async (req: Request, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        // First check if the user_plant exists and belongs to the authenticated user
        const existingUserPlant = await db('user_plants')
            .where({ id: req.params.id })
            .whereNull('deleted_at')
            .first();

        if (!existingUserPlant) {
            return res.status(404).json({ error: 'User plant not found' });
        }

        if (String(existingUserPlant.user_id) !== String(req.user.id)) {
            return res.status(403).json({ error: 'Forbidden: You can only update your own user plants' });
        }

        const now = new Date();
        const [userPlant] = await db('user_plants')
            .where({ id: req.params.id })
            .whereNull('deleted_at')
            .update({ ...req.body, updated_at: now })
            .returning('*');
        res.json(keysToCamel(userPlant));
    } catch (error) {
        console.error('Error updating user plant:', error);
        res.status(500).json({ error: 'Failed to update user plant' });
    }
});

// Soft delete a user_plant
router.delete('/:id', async (req: Request, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        // First check if the user_plant exists and belongs to the authenticated user
        const existingUserPlant = await db('user_plants')
            .where({ id: req.params.id })
            .whereNull('deleted_at')
            .first();

        if (!existingUserPlant) {
            return res.status(404).json({ error: 'User plant not found' });
        }

        if (String(existingUserPlant.user_id) !== String(req.user.id)) {
            return res.status(403).json({ error: 'Forbidden: You can only delete your own user plants' });
        }

        const now = new Date();
        const [userPlant] = await db('user_plants')
            .where({ id: req.params.id })
            .whereNull('deleted_at')
            .update({ deleted_at: now, updated_at: now })
            .returning('*');
        res.json({ success: true });
    } catch (error) {
        console.error('Error deleting user plant:', error);
        res.status(500).json({ error: 'Failed to delete user plant' });
    }
});

export default router; 