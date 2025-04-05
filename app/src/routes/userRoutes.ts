import express from 'express';
import { protect, authorize } from '../middlewares/authMiddleware';
import userController from '../controllers/userController';
import teacherController from '../controllers/teacherController';

const router = express.Router();

// @route GET /api/users
// @desc Get all users
// @access Protected, Admins only
router.get('/users', protect, userController.getAllUsers)
router.get('/user/:userId', protect, userController.getUser)
router.put('/user', protect, userController.updateUser)
router.delete('/user', protect, userController.deleteUser)

// @route GET /api/teachers
// @desc Get all teachers
// @access Protected, Teachers and Admins only
router.get('/teachers', protect, teacherController.getAllTeachers)

// module.exports = router;
export default router