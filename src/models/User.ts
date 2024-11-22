import { Schema, model, Document, Types } from "mongoose";

export interface IUser extends Document {
    _id: Types.ObjectId | string;  // Explicitly define _id type
    username: string;
    email: string;
    password: string;
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

export default model<IUser>("User", userSchema);
