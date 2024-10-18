import { Request, Response } from 'express';
import User, { IUser } from '../models/userModel'

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find({});
        res.json(users);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

const getAllTeachers = async (req: Request, res: Response): Promise<void> => {
    try {
        const teachers = await User.find({ role: 'Teacher' })
        res.json(teachers)

    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}

export default { getAllUsers, getAllTeachers };