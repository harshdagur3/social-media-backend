import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { createPost, deletePost, getAllPosts, getPostById, updatePost } from "../controllers/post.controller";

const router = Router();

router.post("/posts", authMiddleware, createPost);
router.get("/posts", getAllPosts);
router.get("/posts/:id", getPostById);
router.patch("/posts/:id", authMiddleware, updatePost);
router.delete("/posts/:id", authMiddleware, deletePost);

export default router;