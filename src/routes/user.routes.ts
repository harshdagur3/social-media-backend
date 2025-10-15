import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { deleteProfile, getProfile, updateProfile } from "../controllers/user.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: Endpoints for user profile management
 */

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Get the logged-in user's profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 username:
 *                   type: string
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /users/profile:
 *   patch:
 *     summary: Update the logged-in user's profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "new_username"
 *               password:
 *                 type: string
 *                 example: "123456"

 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /users/profile:
 *   delete:
 *     summary: Delete the logged-in user's profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile deleted successfully
 *       401:
 *         description: Unauthorized
 */


router.get("/profile", authMiddleware, getProfile);
router.patch("/profile", authMiddleware, updateProfile);
router.delete("/profile", authMiddleware, deleteProfile);

export default router;