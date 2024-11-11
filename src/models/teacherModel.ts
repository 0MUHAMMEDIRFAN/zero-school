import mongoose, { Model, Schema } from "mongoose";

export interface ITeacher extends Document {
    facultyNo: string;
    name: string;
    email: string;
    phone: number;
    aadhar: number;
    user?: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const TeacherSchema: Schema<ITeacher> = new Schema<ITeacher>({
    facultyNo: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, index: true },
    phone: { type: Number },
    aadhar: { type: Number },
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
}, { timestamps: true })

TeacherSchema.path('email').validate(function (email) {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email); // Assuming email has a text attribute
}, 'The email is not valid');

const Teacher: Model<ITeacher> = mongoose.model<ITeacher>('Teacher', TeacherSchema);
export default Teacher;