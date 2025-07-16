import { RequestHandler } from "express";
import db from "../db";
import { Request } from '../types/express';
import { keysToCamel } from "../helpers/case";

const getUsersJournalEntries = (async (req: Request, res) => {
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
        console.error('Error fetching journal entries:', error);
        res.status(500).json({ error: 'Failed to fetch journal entries' });
    }
}) as RequestHandler

const createJournalEntry = (async (req: Request, res) => {
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
        console.error('Error creating journal entry:', error);
        res.status(500).json({ error: 'Failed to create journal entry' });
    }
}) as RequestHandler

const getJournalEntry = (async (req: Request, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        const { id } = req.params;
        const entry = await db('journal_entries')
            .leftJoin('plants', 'journal_entries.plant_id', 'plants.id')
            .select(
                'journal_entries.*',
                'plants.id as plant_id',
                'plants.common_name as plant_common_name'
            )
            .where('journal_entries.id', id)
            .andWhere('journal_entries.user_id', req.user.id)
            .whereNull('journal_entries.deleted_at')
            .first();
        if (!entry) {
            return res.status(404).json({ error: 'Entry not found' });
        }
        const result = keysToCamel(entry);
        result.plant = {
            id: entry.plant_id,
            commonName: entry.plant_common_name,
        };
        res.json(result);
    } catch (error) {
        console.error('Error fetching journal entry:', error);
        res.status(500).json({ error: 'Failed to fetch journal entry' });
    }
}) as RequestHandler

export default {
    getUsersJournalEntries,
    createJournalEntry,
    getJournalEntry
}