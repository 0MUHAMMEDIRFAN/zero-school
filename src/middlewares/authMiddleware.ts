import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import User, { IUser } from "../models/userModel"

export interface AuthRequest extends Request {
    user: IUser;
}

// protect middleware
export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token: string | undefined;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as JwtPayload;

            // Attach the user to the request
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            res.status(401).json({ message: "Not authorized, token failed" })
        }
    }
    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' })
    }

}

export const authorize = async (...roles: string[]): Promise<unknown> => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "You don't have permission to perform this action" })
        }
        next();
    }
}

// module.exports = { protect, authorize };