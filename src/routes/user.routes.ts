import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { deleteProfile, followUser, getFollowers, getFollowing, getProfile, unfollowUser, updateProfile } from "../controllers/user.controller";

const router = Router();

router.get("/profile", authMiddleware, getProfile);
router.patch("/profile", authMiddleware, updateProfile);
router.delete("/profile", authMiddleware, deleteProfile);

router.post("/users/:id/follow", authMiddleware, followUser);
router.post("/users/:id/unfollow", authMiddleware, unfollowUser);
router.get("/users/:id/followers", getFollowers);
router.get("/users/:id/following", getFollowing);
router.get("/me/followers",authMiddleware, getFollowers);
router.get("/me/following",authMiddleware, getFollowing);

export default router;