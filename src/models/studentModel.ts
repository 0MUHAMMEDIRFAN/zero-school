import mongoose, { Document, Model, Schema } from "mongoose";

interface IStudent extends Document {
    name: string;
    regno: string;
    email: string;
    rollno: number;
    phone: number;
    dob: Date;
    father: string;
    mother: string;
    address: string;
    aadhar: number;
    user?: mongoose.Types.ObjectId | unknown;
    createdAt?: Date;
    updatedAt?: Date;
}

const StudentSchema: Schema<IStudent> = new Schema<IStudent>({
    name: { type: String, required: true },
    regno: { type: String },
    email: { type: String, required: true, index: true },
    rollno: { type: Number },
    phone: { type: Number },
    dob: { type: Date, required: true },
    father: { type: String },
    mother: { type: String },
    address: { type: String },
    aadhar: { type: Number },
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
}, { timestamps: true })

StudentSchema.path('email').validate(function (email) {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email); // Assuming email has a text attribute
}, 'The email is not valid');

const Student: Model<IStudent> = mongoose.model<IStudent>('Student', StudentSchema);
export default Student;