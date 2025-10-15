import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { likePost, unLikePost } from "../controllers/like.controller";

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Likes
 *   description: Like and unlike posts
 */

/**
 * @swagger
 * /likes/{postId}/like:
 *   post:
 *     summary: Like a post
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: ID of the post to like
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post liked successfully
 *       400:
 *         description: Post already liked
 *       404:
 *         description: Post not found
 */

/**
 * @swagger
 * /likes/{postId}/unlike:
 *   delete:
 *     summary: Unlike a post
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: ID of the post to unlike
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post unliked successfully
 *       404:
 *         description: Post not liked or not found
 */


router.post("/:postId/like", authMiddleware, likePost);
router.delete("/:postId/unlike", authMiddleware, unLikePost);

export default router;