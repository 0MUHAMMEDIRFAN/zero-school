import express from 'express';
import authController from '../controllers/authContoller';

const router = express.Router();

// @route POST /api/register
// @desc Register a User
router.post('/login', authController.login)

// @route POST /api/login
// @desc Login user
router.post('/register', authController.register)
// @route POST /api/isUser
router.post('/isuser', authController.isUserExist)

// module.exports = router;
export default router