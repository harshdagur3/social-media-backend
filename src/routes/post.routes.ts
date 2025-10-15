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
import { upload } from "../middlewares/upload.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Post management and interactions
 */

/**
 * @swagger
 * /posts/create:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               caption:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post created successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /posts/getposts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: List of all posts
 */

/**
 * @swagger
 * /posts/{id}/getbyid:
 *   get:
 *     summary: Get a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Post ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post details retrieved successfully
 *       404:
 *         description: Post not found
 */

/**
 * @swagger
 * /posts/{id}/update:
 *   patch:
 *     summary: Update a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Post ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               caption:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       404:
 *         description: Post not found
 */

/**
 * @swagger
 * /posts/{id}/delete:
 *   delete:
 *     summary: Delete a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Post ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       404:
 *         description: Post not found
 */

/**
 * @swagger
 * /posts/myposts:
 *   get:
 *     summary: Get all posts of the authenticated user
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's posts
 */

/**
 * @swagger
 * /posts/{id}/comment:
 *   post:
 *     summary: Add a comment to a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Post ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment added successfully
 *       404:
 *         description: Post not found
 */

/**
 * @swagger
 * /posts/{postId}/comments/{commentId}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: Post ID
 *         schema:
 *           type: string
 *       - in: path
 *         name: commentId
 *         required: true
 *         description: Comment ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 */

/**
 * @swagger
 * /posts/{postId}/comments/{commentId}:
 *   put:
 *     summary: Edit a comment
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: Post ID
 *         schema:
 *           type: string
 *       - in: path
 *         name: commentId
 *         required: true
 *         description: Comment ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       404:
 *         description: Comment not found
 */


router.post("/create", authMiddleware,upload.single("image"), createPost);
router.get("/getposts", getAllPosts);
router.get("/:id/getbyid", getPostById);
router.patch("/:id/update", authMiddleware, updatePost);
router.delete("/:id/delete", authMiddleware, deletePost);
router.get("/myposts", authMiddleware, getMyPosts);
router.post("/:id/comment", authMiddleware, addComment);
router.delete("/:postId/comments/:commentId", authMiddleware, deleteComment);
router.put("/:postId/comments/:commentId", authMiddleware, editComment);

export default router;