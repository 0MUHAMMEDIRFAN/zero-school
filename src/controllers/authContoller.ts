import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import dotenv from 'dotenv'

dotenv.config();
const JWT_SECRET: string = process.env.JWT_SECRET || '';

const generateToken = (id: string | unknown, role: string): string => {
    return jwt.sign({ id, role }, JWT_SECRET, { expiresIn: '1h' })
}

const login = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
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
        console.log(error)
        return res.status(500).json({ message: "Server error" })
    }
}

const register = async (req: Request, res: Response): Promise<any> => {
    const { name, email, password, role } = req.body;
    try {
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "User Already Registered" })
        }

        // Create New User
        user = new User({ name, email, password, role });

        await user.save();

        // let userId = String(user._id)

        // Generate JWT TOKEN
        const token = generateToken(user._id, user.role);

        res.status(201).json({ token, role: user.role });

    } catch (error: any) {
        console.log(error)
        return res.status(500).json({ error: error.message || "", message: error._message || "Server error" });
    }
}

export default { login, register };