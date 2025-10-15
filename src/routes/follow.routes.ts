import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { followUser, getFollowers, getFollowing, unfollowUser } from "../controllers/follow.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Follow
 *   description: Follow and unfollow users, fetch followers and following
 */

/**
 * @swagger
 * /follows/{userId}/follow:
 *   post:
 *     summary: Follow a user
 *     tags: [Follow]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to follow
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User followed successfully
 *       400:
 *         description: Already following or cannot follow yourself
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /follows/{userId}/unfollow:
 *   post:
 *     summary: Unfollow a user
 *     tags: [Follow]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to unfollow
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User unfollowed successfully
 *       404:
 *         description: You are not following this user
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /follows/{userId}/getfollowers:
 *   get:
 *     summary: Get all followers of a user
 *     tags: [Follow]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of followers
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /follows/{userId}/getfollowing:
 *   get:
 *     summary: Get all users a user is following
 *     tags: [Follow]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of following users
 *       401:
 *         description: Unauthorized
 */


router.post("/:userId/follow", authMiddleware, followUser);
router.post("/:userId/unfollow", authMiddleware, unfollowUser);
router.get("/:userId/getfollowers", authMiddleware, getFollowers);
router.get("/:userId/getfollowing", authMiddleware, getFollowing);

export default router;