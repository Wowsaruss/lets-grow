import axios from 'axios';
import express, { Request, Response, RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import db from '../db';
import { checkJwt, attachUser } from '../middleware/auth';
import { fetchGrowingZoneId } from '../helpers/growingZones';
import { CreateUserBody, UpdateUserBody } from '../../../types/User';
import { keysToCamel } from '../helpers/case';

const router = express.Router();

// Get current user
router.get('/me', checkJwt, attachUser, (async (req: any, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return user data without sensitive information
    const { password_hash, ...userData } = user;
    res.json(keysToCamel(userData));
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
    res.json(keysToCamel(users));
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
    res.json(keysToCamel(user));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
}) as RequestHandler);

// Create new user
router.post('/', (async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      username,
      role,
      city,
      state,
      address1,
      zipcode,
      password,
    } = req.body as CreateUserBody;

    // Fetch the correct growing-zone id
    let growingZoneId = req.body.growingZoneId
    if (!req.body.growing_zone_id) {
      growingZoneId = await fetchGrowingZoneId(zipcode)
    }

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
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        username,
        role,
        city,
        state,
        address_1: address1,
        address_2: req.body.address2 || null,
        zipcode,
        growing_zone_id: growingZoneId,
        garden_type_id: req.body.gardenTypeId || null,
        is_active: true,
        password_hash,
        auth0_id: req.body.auth0Id || null,
        created_at: new Date(),
        updated_at: new Date()
      })
      .returning(['id', 'email', 'first_name', 'last_name', 'is_active', 'created_at']);

    await res.status(201).json(keysToCamel(user));
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to create user' });
  }
}) as RequestHandler);

// Update user
router.put('/:id', (async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      username,
      role,
      city,
      state,
      address1,
      address2,
      zipcode,
      password,
      growingZoneId,
      gardenTypeId,
      auth0Id,
      isActive
    } = req.body as UpdateUserBody;
    const { id } = req.params;

    // Build update object with only provided fields
    const updateData: any = {
      updated_at: db.fn.now()
    };

    if (firstName !== undefined) updateData.first_name = firstName;
    if (lastName !== undefined) updateData.last_name = lastName;
    if (email !== undefined) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone;
    if (username !== undefined) updateData.username = username;
    if (role !== undefined) updateData.role = role;
    if (city !== undefined) updateData.city = city;
    if (state !== undefined) updateData.state = state;
    if (address1 !== undefined) updateData.address_1 = address1;
    if (address2 !== undefined) updateData.address_2 = address2;
    if (zipcode !== undefined) updateData.zipcode = zipcode;
    if (growingZoneId !== undefined) updateData.growing_zone_id = growingZoneId;
    if (gardenTypeId !== undefined) updateData.garden_type_id = gardenTypeId;
    if (auth0Id !== undefined) updateData.auth0_id = auth0Id;
    if (isActive !== undefined) updateData.is_active = isActive;

    // Handle password hashing if password is provided
    if (password) {
      const saltRounds = 10;
      updateData.password_hash = await bcrypt.hash(password, saltRounds);
    }

    // Check if email is being updated and if it already exists
    if (email) {
      const existingUser = await db('users')
        .where({ email })
        .whereNot({ id })
        .first();
      if (existingUser) {
        return res.status(400).json({ error: 'User with this email already exists' });
      }
    }

    const [user] = await db('users')
      .where({ id })
      .update(updateData)
      .returning(['id', 'email', 'first_name', 'last_name', 'is_active', 'created_at']);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(keysToCamel(user));
  } catch (error) {
    console.log(error);
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
    res.json(keysToCamel(user));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
}) as RequestHandler);

export default router; 