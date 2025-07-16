import express from 'express';
import { checkJwt, attachUser } from '../middleware/auth';
import greenThumbsController from '../controllers/green_thumbs';

const router = express.Router();

router.get('/', checkJwt, attachUser, greenThumbsController.getUserGreenThumbs);
router.post('/:plant_id', checkJwt, attachUser, greenThumbsController.getPlantGreenThumbs);

export default router; 