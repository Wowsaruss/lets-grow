import express from 'express';
import bcrypt from 'bcrypt';
import db from '../db';

const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await db('users')
      .select('id', 'email', 'first_name', 'last_name', 'is_active', 'created_at')
      .where('is_active', true);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await db('users')
      .select('id', 'email', 'first_name', 'last_name', 'is_active', 'created_at')
      .where({ id: req.params.id })
      .first();
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Create new user
router.post('/', async (req, res) => {
  try {
    const { email, password, first_name, last_name, auth0_id } = req.body;
    
    // Check if user with email already exists
    const existingUser = await db('users').where({ email }).first();
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash password
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    const [user] = await db('users')
      .insert({
        email,
        password_hash,
        first_name,
        last_name,
        auth0_id,
        is_active: true
      })
      .returning(['id', 'email', 'first_name', 'last_name', 'is_active', 'created_at']);
    
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Update user
router.put('/:id', async (req, res) => {
  try {
    const { first_name, last_name, is_active } = req.body;
    
    const [user] = await db('users')
      .where({ id: req.params.id })
      .update({
        first_name,
        last_name,
        is_active,
        updated_at: db.fn.now()
      })
      .returning(['id', 'email', 'first_name', 'last_name', 'is_active', 'created_at']);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Delete user (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    const [user] = await db('users')
      .where({ id: req.params.id })
      .update({ is_active: false })
      .returning(['id', 'email', 'is_active']);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Get user by Auth0 ID
router.get('/auth0/:auth0_id', async (req, res) => {
  try {
    const user = await db('users')
      .select('id', 'email', 'first_name', 'last_name', 'is_active', 'created_at')
      .where({ auth0_id: req.params.auth0_id })
      .first();
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

export default router; 