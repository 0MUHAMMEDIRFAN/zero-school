import { Request, Response } from 'express';
import Role, { IRole } from '../models/roleModel';
import { responseError } from '../utils/resErrorHandle';

const createRole = async (req: Request, res: Response): Promise<any> => {
    const { name, permissions } = req.body;
    try {
        let role = new Role({ name, permissions })
        await role.save()

        res.status(201).json({ message: "Role created successfully", role })
    } catch (error) {
        responseError(res, error);
    }
}

const getAllRoles = async (req: Request, res: Response): Promise<any> => {
    try {
        const roles = Role.find();
        
    } catch (error) {
        
    }
}

export default { createRole }