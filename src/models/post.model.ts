import mongoose, { Document, Schema } from "mongoose";

export interface IPost extends Document {
    comments: any;
    title: string;
    content: string;
    author: mongoose.Types.ObjectId; // reference to User
    likeCount: number;
    image: string;
    createdAt: Date;
    updatedAt: Date;
}

const postSchema: Schema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },//relation
    likeCount: { type: Number, default: 0 },
    image: { type: String },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment", default: [] }]
},
    { timestamps: true }
);

export const Post = mongoose.model<IPost>("Post", postSchema);