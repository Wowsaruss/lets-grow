import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import plantsRouter from './routes/plants';
import usersRouter from './routes/users';
import db from './db';

// Initialize environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Make db available to middleware
app.locals.db = db;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/plants', plantsRouter);
app.use('/api/users', usersRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 