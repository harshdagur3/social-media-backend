import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { Post } from "../models/post.model";

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) return res.status(400).json({ error: "Title or content required" });

        const userId = (req as AuthRequest).user?.id;
        if (!userId) return res.status(401).json({ error: "Unauthorized" });
        
        const post = await Post.create({ title, content, author: userId });
        return res.status(200).json(post);

    } catch (error) {
        next(error);
    }
}

