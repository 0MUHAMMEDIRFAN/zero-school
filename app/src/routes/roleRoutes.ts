import express from 'express';
import roleController from '../controllers/roleController';
import { authorize, protect } from '../middlewares/authMiddleware';

const router = express.Router();


router.post('/role', protect,authorize("create:roles"), roleController.createRole)

export default router;