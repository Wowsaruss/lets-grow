import express from 'express';
import db from '../db';
import { keysToCamel } from '../helpers/case';
import { checkJwt, attachUser } from '../middleware/auth';
import { Request } from '../types/express';

const router = express.Router();

// Get all journal entries for the authenticated user (optionally filter by plantId)
router.get('/', checkJwt, attachUser, async (req: Request, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        const { plantId } = req.query;
        let query = db('journal_entries')
            .leftJoin('plants', 'journal_entries.plant_id', 'plants.id')
            .select(
                'journal_entries.*',
                'plants.id as plant_id',
                'plants.common_name as plant_common_name'
            )
            .where('journal_entries.user_id', req.user.id)
            .whereNull('journal_entries.deleted_at');
        if (plantId) {
            query = query.andWhere('journal_entries.plant_id', plantId);
        }
        const entries = await query.orderBy('journal_entries.date', 'desc');
        // Map plant info into a nested object
        const result = entries.map(e => {
            const entry = keysToCamel(e);
            entry.plant = {
                id: e.plant_id,
                commonName: e.plant_common_name,
            };
            return entry;
        });
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch journal entries' });
    }
});

// Create a new journal entry for the authenticated user
router.post('/', checkJwt, attachUser, async (req: Request, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        const { plantId, date, subject, body } = req.body;
        if (!plantId || !date || !subject || !body) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const now = new Date();
        const entryData = {
            user_id: req.user.id,
            plant_id: plantId,
            date,
            subject,
            body,
            created_at: now,
            updated_at: now,
        };
        const [entry] = await db('journal_entries').insert(entryData).returning('*');
        res.status(201).json(keysToCamel(entry));
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to create journal entry' });
    }
});

export default router; 