import { Request, Response } from 'express';
import User from '../models/userModel';
import userController from './userController'
import { generateToken } from '../utils/generateToken';
import { responseError } from '../utils/resErrorHandle';



const login = async (req: Request, res: Response): Promise<any> => {
    const { phone, password } = req.body;
    try {
        let user = await User.findOne({ phone });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" })
        }

        // Compare password
        const isMatch = await user.matchPassword(password)
        if (!isMatch) {
            return res.status(400).json({ message: "Password does not match" })
        }

        const token = generateToken(user?._id, user.role)
        res.json({ token, role: user.role })

        // Login User
    } catch (error) {
        responseError(res, error);
    }
}

const register = userController.createUser;
const { isUserExist } = userController;

export default { login, register, isUserExist };