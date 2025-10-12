import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { Post } from "../models/post.model";
import { Like } from "../models/like.model";

export const likePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as AuthRequest).user?.id;
        const { postId } = req.params;

        if (!userId) return res.status(401).json({ error: "Unauthorized" });

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ error: "post not found" });

        const likeExists = await Like.findOne({ user: userId, post: postId });
        if (likeExists) return res.status(400).json({ error: "Already liked!" });

        await Like.create({ user: userId, post: postId });
        post.likeCount = (post.likeCount || 0) + 1;
        await post.save();
        return res.status(200).json({ message: "Post Liked!" });

    } catch (error) {
        next(error);
    }
}

export const unLikePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as AuthRequest).user?.id;
        const { postId } = req.params;

        if (!userId) return res.status(401).json({ error: "Unauthorized" });

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ error: "post not found" });

        const likeExists = await Like.findOne({ user: userId, post: postId });
        if (!likeExists) return res.status(400).json({ error: "Post not liked yet!" });

        await likeExists.deleteOne();

        if (post.likeCount && post.likeCount > 0) {
            post.likeCount -= 1;
        } else {
            post.likeCount = 0;
        }

        await post.save();
        return res.status(200).json({ message: "Post unliked!" });

    } catch (error) {
        next(error);
    }
}
