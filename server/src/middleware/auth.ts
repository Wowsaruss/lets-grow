import { auth } from 'express-oauth2-jwt-bearer';
import { Response, NextFunction } from 'express';
import { Request } from '../types/express';
import authConfig from '../config/auth0'

// Auth0 configuration
export const checkJwt = auth({
  audience: authConfig.audience,
  issuerBaseURL: authConfig.issuerBaseURL,
  tokenSigningAlg: authConfig.tokenSigningAlg
});

// Middleware to attach user data to request
export const attachUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const auth0Id = req.auth?.payload.sub;
    if (!auth0Id) {
      console.log('No auth0Id found in token');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Get user from database
    const user = await req.app.locals.db('users')
      .where({ auth0_id: auth0Id })
      .first();

    if (!user) {
      console.log('No user found in database for auth0_id:', auth0Id);
      return res.status(404).json({ error: 'User not found' });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.error('Error in attachUser middleware:', error);
    res.status(500).json({ error: 'Failed to authenticate user' });
  }
}; 