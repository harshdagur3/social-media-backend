import { Router } from "express";
import { signup, login } from "../controllers/auth.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication routes
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: harsh123
 *               password:
 *                 type: string
 *                 example: StrongP@ssw0rd
 *     responses:
 *       200:
 *         description: User created successfully
 *       400:
 *         description: Invalid input / User already exists
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               user:
 *                 type: string
 *                 example: alice
 *               password:
 *                 type: string
 *                 example: StrongP@ssw0rd
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token
 *       400:
 *         description: Invalid credentials
 */


router.post("/signup", signup);
router.post("/login", login);

export default router;