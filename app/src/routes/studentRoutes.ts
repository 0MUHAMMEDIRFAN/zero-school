import express from 'express';
import studentController from '../controllers/studentController';
import { authorize, protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/students', protect, authorize("admin", "teacher"), studentController.getAllStudents)
router.post('/student', protect, authorize("admin", "teacher"), studentController.createStudent)


export default router;