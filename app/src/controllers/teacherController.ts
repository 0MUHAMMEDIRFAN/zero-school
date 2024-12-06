import { Request, Response } from "express";
import User from "../models/userModel";
import { responseError } from "../utils/resErrorHandle";

const getAllTeachers = async (req: Request, res: Response): Promise<void> => {
    try {
        const teachers = await User.find({ role: 'Teacher' });
        res.json(teachers)
    } catch (error) {
        responseError(res, error);
    }
}

export default { getAllTeachers };