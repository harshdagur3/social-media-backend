import mongoose, { Document, Schema } from "mongoose";

export interface IPost extends Document {
    title: string;
    content: string;
    author: mongoose.Types.ObjectId; // reference to User
    createdAt: Date;
    updatedAt: Date;
}

const postSchema: Schema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true } //relation
},
    { timestamps: true }
);

export const Post = mongoose.model<IPost>("Post", postSchema);