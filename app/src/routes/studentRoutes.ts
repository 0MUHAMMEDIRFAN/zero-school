import express from 'express';
import studentController from '../controllers/studentController';
import { authorize, protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/students', protect, authorize("view:students"), studentController.getAllStudents)
router.post('/student', protect, authorize("create:teachers"), studentController.createStudent)


export default router;