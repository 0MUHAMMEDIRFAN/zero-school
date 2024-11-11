import express from 'express';
import { protect, authorize } from '../middlewares/authMiddleware';
import userController from '../controllers/userController';

const router = express.Router();

// @route GET /api/users
// @desc Get all users
// @access Protected, Admins only
router.get('/users', protect, authorize('admin'), userController.getAllUsers)
router.get('/user/:userId', protect, authorize('admin'), userController.getUser)
router.put('/user', protect, authorize('admin'), userController.updateUser)
router.delete('/user', protect, authorize('admin'), userController.deleteUser)

// @route GET /api/teachers
// @desc Get all teachers
// @access Protected, Teachers and Admins only
router.get('/teachers', protect, userController.getAllTeachers)

// module.exports = router;
export default router