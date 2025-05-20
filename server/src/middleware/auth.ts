import { auth } from 'express-oauth2-jwt-bearer';
import { Response, NextFunction } from 'express';
import { Request } from '../types/express';

// Auth0 configuration
export const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
});

// Middleware to attach user data to request
export const attachUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('Auth headers:', req.headers.authorization);
    console.log('Auth payload:', req.auth?.payload);
    
    const auth0Id = req.auth?.payload.sub;
    if (!auth0Id) {
      console.log('No auth0Id found in token');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    console.log('Looking for user with auth0_id:', auth0Id);
    // Get user from database
    const user = await req.app.locals.db('users')
      .where({ auth0_id: auth0Id })
      .first();

    if (!user) {
      console.log('No user found in database for auth0_id:', auth0Id);
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('Found user:', user);
    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.error('Error in attachUser middleware:', error);
    res.status(500).json({ error: 'Failed to authenticate user' });
  }
}; 