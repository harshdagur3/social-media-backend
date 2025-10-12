import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
    addComment,
    createPost,
    deleteComment,
    deletePost,
    editComment,
    getAllPosts,
    getMyPosts,
    getPostById,
    updatePost
} from "../controllers/post.controller";

const router = Router();

router.post("/posts", authMiddleware, createPost);
router.get("/posts", getAllPosts);
router.get("/posts/:id", getPostById);
router.patch("/posts/:id", authMiddleware, updatePost);
router.delete("/posts/:id", authMiddleware, deletePost);
router.get("/myposts", authMiddleware, getMyPosts);
router.post("/posts/:id/comment", authMiddleware, addComment);
router.delete("/posts/:postId/comments/:commentId", authMiddleware, deleteComment);
router.put("/posts/:postId/comments/:commentId", authMiddleware, editComment);

export default router;