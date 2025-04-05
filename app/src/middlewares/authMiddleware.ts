import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import User, { IUser } from "../models/userModel"
import { responseError } from "../utils/resErrorHandle";

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
            req.user = await User.findById(decoded.id).populate("role").select('-password');

            next();
        } catch (error) {
            responseError(res, "", 401, "Not authorized, token failed");
        }
    }
    else if (!token) {
        responseError(res, "", 401, 'Not authorized, no token');
    }

}

export const authorize = (permission: string) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user.role.permissions.includes(permission)) { // the user is attaching in the protect middleware
            return responseError(res, '', 403, "You don't have permission to perform this action");
        }
        next();
    }
}

// module.exports = { protect, authorize };