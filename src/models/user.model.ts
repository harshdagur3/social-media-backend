import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document{
    username: string,
    password: string,
    followers: mongoose.Types.ObjectId[];
    following: mongoose.Types.ObjectId[];
}

const userSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }]
});

export const User = mongoose.model<IUser>("User", userSchema);