import express from 'express';
import { checkJwt, attachUser } from '../middleware/auth';
import journalEntriesController from '../controllers/journal_entries'

const router = express.Router();

router.get('/', checkJwt, attachUser, journalEntriesController.getUsersJournalEntries);
router.post('/', checkJwt, attachUser, journalEntriesController.createJournalEntry);
router.get('/:id', checkJwt, attachUser, journalEntriesController.getJournalEntry);

export default router; 