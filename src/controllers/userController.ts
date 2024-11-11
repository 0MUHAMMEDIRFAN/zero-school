import { Request, Response } from 'express';
import User, { IUser } from '../models/userModel'
import { emitData } from '../socket';
import { SOCKET_EVENTS } from '../config/socketEvents';
import { generateToken } from '../utils/generateToken';
import { responseError } from '../utils/resErrorHandle';
import { checkValidObjectId } from '../utils/checkValidObjectId';

const createUser = async (req: Request, res: Response): Promise<any> => {
    const { name, email, password, role, phone } = req.body;
    try {
        let user = await User.findOne({ phone })
        if (user) {
            return res.status(400).json({ message: "User Already Registered" })
        }

        // Create New User
        user = new User({ name, email, password, role, phone });

        await user.save();

        // Convert user document to plain JavaScript object and exclude password
        const { password: pass, ...userWithoutPassword } = user.toObject();

        // Generate JWT TOKEN
        const token = generateToken(user._id, user.role);

        // Emit user data through socket.io
        emitData(SOCKET_EVENTS.NEW_USER, userWithoutPassword);

        res.status(201).json({ token, user: userWithoutPassword });

    } catch (error: any) {
        responseError(res, error);
    }
}

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const sortField = req.query.sortField as string || null;
    try {
        const totalUsers = await User.countDocuments({});
        const users = await User.find({}).select('-password').sort(sortField).skip((page - 1) * limit).limit(limit);
        res.json({ data: users, meta: { page, limit, total: totalUsers } });

    } catch (error) {
        responseError(res, error);
    }
}

const getUser = async (req: Request, res: Response): Promise<any> => {
    const id = checkValidObjectId(req.params.userId)
    try {
        const user = await User.findById(id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.json(user)
    } catch (error) {
        responseError(res, error);
    }
}

const updateUser = async (req: Request, res: Response): Promise<void> => {
    const id = checkValidObjectId(req.body.id);
    const { name, email, role } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(id,
            { name, email, role },
            { new: true, runValidators: true }
        ).select('-password')
        if (!updatedUser) {
            return responseError(res, "", 404, "Invalid UserId")
        }
        res.json(updatedUser);
    } catch (error) {
        responseError(res, error);
    }
}

const deleteUser = async (req: Request, res: Response): Promise<any> => {
    const id = checkValidObjectId(req.body.id);
    try {
        const deletedUser = await User.findByIdAndDelete(id).select('-password');
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully', user: deletedUser });
    } catch (error) {
        responseError(res, error);
    }
}

const isUserExist = async (req: Request, res: Response): Promise<any> => {
    const { phone } = req.body;
    try {
        let user = await User.findOne({ phone });
        if (user) {
            return res.json({ status: true, message: "User exist" });
        }
        return res.status(400).json({ status: false, message: "User does not exist" });
    } catch (error) {
        responseError(res, error);
    }
}

export default { getAllUsers, createUser, getUser, updateUser, deleteUser, isUserExist };