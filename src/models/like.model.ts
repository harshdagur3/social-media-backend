import mongoose, { Document, Schema } from "mongoose";

export interface ILike extends Document {
    user: mongoose.Types.ObjectId;
    post: mongoose.Types.ObjectId;
    createdAt: Date;
}

export const likeSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    createdAt: { type: Date, default: Date.now }
});

export const Like = mongoose.model<ILike>("Like", likeSchema);