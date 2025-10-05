import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { Post } from "../models/post.model";
import { postSchema } from "../validations/post.validation";
import { Comment } from "../models/comment.model";

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsed = postSchema.parse(req.body);
      
        const userId = (req as AuthRequest).user?.id;
        if (!userId) return res.status(401).json({ error: "Unauthorized" });

        const post = await Post.create({ title:parsed.title, content:parsed.content, author: userId });
        return res.status(201).json(post);

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
        const post = await Post.findById(id)
            .populate("author", "username")
            .populate({
                path: "comments",
                populate:{path:"author",select:"username"},
            });
        if (!post) return res.status(404).json({ error: "post not found" });
        return res.status(200).json(post);
    } catch (error) {
        next(error);
    }
}

export const updatePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const parsed = postSchema.partial().parse(req.body);
        const userId = (req as AuthRequest).user?.id;

        //check if logged-in user is author
        const post = await Post.findById(id);
        if (!post) return res.status(404).json({ error: "post not found" });
        if (post.author.toString() !== userId) return res.status(403).json({ error: "Forbidden" });

        //update post
        const updatedPost = await Post.findByIdAndUpdate(id, { title:parsed.title, content:parsed.content }, { new: true })
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

export const getMyPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const userId = (req as AuthRequest).user?.id;
        if (!userId) return res.status(401).json({ error: "Unauthorized" });
        const posts = await Post.find({ author: userId }).populate("author", "username");
        return res.status(200).json(posts);

    } catch (error) {
        next(error);
    }
}


export const likePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId:any = (req as AuthRequest).user?.id;
        const postId = req.params.id;

        if (!userId) return res.status(401).json({ error: "Unauthorized" });

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ error: "Post not found" });

        if (post.likes.includes(userId)) {
            return res.status(400).json({ message: "Already liked" });
        }

        post.likes.push(userId);
        await post.save();
        res.status(200).json({ message: "Post liked successfully" });
    } catch (error) {
        next(error);
    }
};

export const unlikePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId:any = (req as AuthRequest).user?.id;
        const postId = req.params.id;
        if (!userId) return res.status(401).json({ error: "Unauthorized" });

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ error: "Post not found" });

        if (!post.likes.includes(userId)) {
            return res.status(400).json({ message: "You have not liked this post" });
        }

        post.likes = post.likes.filter(id => id.toString() !== userId);
        await post.save();
        res.status(200).json({ message: "Post unliked successfully" });
    } catch (error) {
        next(error);
    }    
}

export const addComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const postId = req.params.id;
        const { text } = req.body;

        const userId = (req as AuthRequest).user?.id;
        if (!userId) res.status(401).json({ error: "Unauthorized" });
        if (!text) res.status(400).json({ error: "Text required" });
        const post:any = await Post.findById(postId);
        if (!post) res.status(404).json({ error: "post not found" });

        const createComment = await Comment.create({
            post: post._id,
            author: userId,
            text
        });

        (post as any).comments.push(createComment._id);
        await post.save();

        const updatedPost = await Post.findById(postId)
            .populate("author", "username")
            .populate({
                path: "comments",
                populate: { path: "author", select: "username" }
            });
        return res.status(200).json(updatedPost);

    } catch (error) {
        next(error);
    }
}