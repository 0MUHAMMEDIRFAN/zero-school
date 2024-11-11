import { Response } from "express";

export const responseError = (res: Response, error: any, statusCode: number = 500, message: string = "Server Error") => {
    console.log(error);
    res.status(statusCode).json({ error: error.message || "error", message: error.message || message })
}