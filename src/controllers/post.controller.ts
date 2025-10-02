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

export const getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const posts = await Post.find().populate("author", "username");
        if (!posts) return res.status(404).json({ error: "No posts yet" });

        return res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
}

export const getPostById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id).populate("author", "username");
        if (!post) return res.status(404).json({ error: "post not found" });
        return res.status(200).json(post);
    } catch (error) {
        next(error);
    }
}

export const updatePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const userId = (req as AuthRequest).user?.id;

        //check if logged-in user is author
        const post = await Post.findById(id);
        if (!post) return res.status(404).json({ error: "post not found" });
        if (post.author.toString() !== userId) return res.status(403).json({ error: "Forbidden" });

        //update post
        const updatedPost = await Post.findByIdAndUpdate(id, { title, content }, { new: true })
            .populate("author", "username");
        
        return res.status(200).json(updatedPost);
    } catch (error) {
        next(error);
    }
}

export const deletePost = async (req: Request, res: Response,next: NextFunction) => {
    try {
        const { postId }: any = req.params.id;
        const userId = (req as AuthRequest).user?.id;

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ error: "post not found" });
        if (post.author.toString() !== userId) return res.status(403).json({ error: "Forbidden" });

        await Post.findByIdAndDelete(postId);

        return res.status(200).json({ message: "Post deleted Successfully!" })
    } catch (error) {
        next(error);
    }

}