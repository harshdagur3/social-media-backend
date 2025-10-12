import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { likePost, unLikePost } from "../controllers/like.controller";

const router = Router();

router.post("/likes/:postId/like", authMiddleware, likePost);
router.delete("/likes/:postId/unlike", authMiddleware, unLikePost);

export default router;