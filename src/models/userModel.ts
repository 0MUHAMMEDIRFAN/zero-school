import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the User interface and the UserSchema

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: "admin" | "teacher" | "student";
    matchPassword(enteredPassword: string): Promise<boolean>;
}

// Define User Schema
const UserSchema: Schema<IUser> = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'teacher', 'student'], default: 'student' },
})

// Hash Password before saving to database
UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password'))
        return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

UserSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
}

const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);
export default User;