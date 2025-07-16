import express from 'express';
import { checkJwt, attachUser } from '../middleware/auth';
import plantsController from '../controllers/plants';

const router = express.Router();

router.get('/', checkJwt, attachUser, plantsController.getAllPlants);
router.get('/user/:userId', checkJwt, attachUser, plantsController.getAllUserPlants);
router.get('/:id', plantsController.getPlant);
router.post('/', checkJwt, attachUser, plantsController.createPlant);
router.put('/:id', checkJwt, attachUser, plantsController.updatePlant);
router.delete('/:id', checkJwt, attachUser, plantsController.deletePlant);
router.post('/ai-generate', checkJwt, attachUser, plantsController.aiPlantGen);


export default router; 