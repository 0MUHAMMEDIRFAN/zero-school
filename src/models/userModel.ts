import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the User interface and the UserSchema

export interface IUser extends Document {
    name: string;
    email: string;
    phone: number;
    password: string;
    role: "admin" | "teacher" | "student";
    student?: mongoose.Types.ObjectId | unknown;
    teacher?: mongoose.Types.ObjectId | unknown;
    matchPassword(enteredPassword: string): Promise<boolean>;
    createdAt?: Date;
    updatedAt?: Date;
}

// Define User Schema
const UserSchema: Schema<IUser> = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, index: true },
    phone: { type: Number, required: true, index: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'teacher', 'student'], default: 'student' },
    student: { type: mongoose.Types.ObjectId, ref: 'Student' },
    teacher: { type: mongoose.Types.ObjectId, ref: 'Teacher' },
}, { timestamps: true })

// Hash Password before saving to database
UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password'))
        return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

UserSchema.path('email').validate(function (email) {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email); // Assuming email has a text attribute
}, 'The email is not valid');

UserSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
}

const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);
export default User;