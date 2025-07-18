import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import plantsRouter from './routes/plants';
import greenThumbsRouter from './routes/green_thumbs';
import usersRouter from './routes/users';
import journalEntriesRouter from './routes/journal_entries';
import db from './db';

// Initialize environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Make db available to middleware
app.locals.db = db;
app.locals.ai = db.ai;

// CORS setup for both local and production
const allowedOrigins = [
  'http://localhost:3000',
  'https://lets-grow.vercel.app'
];
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', usersRouter);
app.use('/api/plants', plantsRouter);
app.use('/api/green-thumbs', greenThumbsRouter);
app.use('/api/journal-entries', journalEntriesRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 