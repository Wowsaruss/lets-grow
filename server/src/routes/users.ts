import express from 'express';
import { checkJwt, attachUser } from '../middleware/auth';
import usersController from '../controllers/users';

const router = express.Router();

router.get('/me', checkJwt, attachUser, usersController.getCurrentUser);
router.get('/:id', usersController.getUserById);
router.post('/', usersController.createNewUser);
router.put('/:id', usersController.updateUser);
router.delete('/:id', usersController.softDeleteUser);
router.get('/auth0/:auth0_id', usersController.getUserByAuth0Id);
router.post('/auth0-register', usersController.registerAuth0User);

export default router; 