import mongoose, { Schema, Model, Document } from "mongoose";

export interface IRole extends Document {
    name: string;
    permissions: string[];
}

const RoleSchema: Schema<IRole> = new Schema<IRole>({
    name: { type: String, required: true },
    permissions: { type: [String] }
}, { timestamps: true })

const Role: Model<IRole> = mongoose.model<IRole>('Role', RoleSchema);

export default Role;