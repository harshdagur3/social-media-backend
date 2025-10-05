import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { createPost, deletePost, getAllPosts, getMyPosts, getPostById, likePost, unlikePost, updatePost } from "../controllers/post.controller";

const router = Router();

router.post("/posts", authMiddleware, createPost);
router.get("/posts", getAllPosts);
router.get("/posts/:id", getPostById);
router.patch("/posts/:id", authMiddleware, updatePost);
router.delete("/posts/:id", authMiddleware, deletePost);
router.get("/myposts", authMiddleware, getMyPosts);
router.post("/posts/:id/like", authMiddleware, likePost);
router.post("/posts/:id/unlike", authMiddleware, unlikePost);

export default router;