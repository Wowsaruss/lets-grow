import { User } from '../../../types/User';
import { AuthResult } from 'express-oauth2-jwt-bearer';
import { Request as ExpressRequest } from 'express';

export interface Request extends ExpressRequest {
    user?: User;
    auth?: AuthResult;
}

// This export is needed to make this a module
export {}; 