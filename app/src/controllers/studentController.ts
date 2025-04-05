import { Request, Response } from "express";
import Student from "../models/studentModel";
import { responseError } from "../utils/resErrorHandle";
import { checkValidObjectId } from "../utils/checkValidObjectId";
import User from "../models/userModel";

const createStudent = async (req: Request, res: Response): Promise<void> => {
    const { regno, gender, name, email, rollno, phone, dob, father, mother, address, aadhar } = req.body;
    try {
        let student = new Student({ name, regno, email, rollno, gender, phone, dob, father, mother, address, aadhar });
        let user = await User.findOne({ phone });
        if (user) {
            student.user = user._id;
        } else {
            user = new User({ phone, role: "student" });
            // user.student = student._id;
            await user.save();
            student.user = user._id;
        }
        await student.save();
        res.status(201).json(student);
    } catch (error) {
        responseError(res, error);
    }

}


const getAllStudents = async (req: Request, res: Response): Promise<void> => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const sortField = req.query.sort as string || null;
    try {
        const totalStudents = await Student.countDocuments({});
        const students = await Student.find({}).sort(sortField).skip((page - 1) * limit).limit(limit);
        res.json({ data: students, meta: { page, limit, total: totalStudents } });
    } catch (error) {
        responseError(res, error);
    }
}

const getStudent = async (req: Request, res: Response): Promise<void> => {
    const id = checkValidObjectId(req.params.id)
    try {
        const student = await Student.findById(id);
        if (!student) {
            responseError(res, "", 404, "Student not found")
        }
        res.json(student);
    } catch (error) {
        responseError(res, error);
    }
}

const updateStudent = async (req: Request, res: Response): Promise<void> => {
    const id = checkValidObjectId(req.body.id)
    const { email, rollno, father, mother, address } = req.body;

    try {
        const updatedStudent = await Student.findByIdAndUpdate(id, { email, rollno, father, mother, address })
        if (!updatedStudent) {
            return responseError(res, "", 404, "Invalid StudentId")
        }
        res.json(updateStudent)
    } catch (error) {
        responseError(res, error)
    }
}

const deleteStudent = async (req: Request, res: Response): Promise<void> => {
    const id = checkValidObjectId(req.params.id);
    try {
        const deletedStudent = await Student.findByIdAndDelete(id);
        if (!deletedStudent) {
            return responseError(res, "", 404, "Invalid StudentId")
        }
        res.json({ message: "Student deleted successfully", student: deletedStudent })
    } catch (error) {
        responseError(res, error)
    }
}


export default { createStudent, getAllStudents, getStudent, updateStudent, deleteStudent };