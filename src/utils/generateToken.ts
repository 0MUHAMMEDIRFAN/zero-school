import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config()
const JWT_SECRET: string = process.env.JWT_SECRET || '';

export const generateToken = (id: string | unknown, role: string): string => {
    return jwt.sign({ id, role }, JWT_SECRET, { expiresIn: '1d' })
}