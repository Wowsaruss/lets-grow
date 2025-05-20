import express, { Request, Response, RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import db from '../db';
import { checkJwt, attachUser } from '../middleware/auth';

const router = express.Router();

// Get current user
router.get('/me', checkJwt, attachUser, (async (req: any, res: Response) => {
  try {

    console.log(req.user);
    const user = req.user;
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Return user data without sensitive information
    const { password_hash, ...userData } = user;
    res.json(userData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
}) as RequestHandler);

// Get all users
router.get('/', (async (req: Request, res: Response) => {
  try {
    const users = await db('users')
      .select('id', 'email', 'first_name', 'last_name', 'is_active', 'created_at')
      .where('is_active', true);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}) as RequestHandler);

// Get user by ID
router.get('/:id', (async (req: Request, res: Response) => {
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
}) as RequestHandler);

interface CreateUserBody {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  auth0_id?: string;
}

// Create new user
router.post('/', (async (req: Request, res: Response) => {
  try {
    const { email, password, first_name, last_name, auth0_id } = req.body as CreateUserBody;
    
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
}) as RequestHandler);

interface UpdateUserBody {
  first_name?: string;
  last_name?: string;
  is_active?: boolean;
}

// Update user
router.put('/:id', (async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, is_active } = req.body as UpdateUserBody;
    const { id } = req.params;
    
    const [user] = await db('users')
      .where({ id })
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
}) as RequestHandler);

// Delete user (soft delete)
router.delete('/:id', (async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [user] = await db('users')
      .where({ id })
      .update({ is_active: false })
      .returning(['id', 'email', 'is_active']);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
}) as RequestHandler);

// Get user by Auth0 ID
router.get('/auth0/:auth0_id', (async (req: Request, res: Response) => {
  try {
    const { auth0_id } = req.params;
    const user = await db('users')
      .select('id', 'email', 'first_name', 'last_name', 'is_active', 'created_at')
      .where({ auth0_id })
      .first();
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
}) as RequestHandler);

export default router; 