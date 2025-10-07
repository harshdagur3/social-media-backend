import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { deleteProfile, followUser, getProfile, unfollowUser, updateProfile } from "../controllers/user.controller";

const router = Router();

router.get("/profile", authMiddleware, getProfile);
router.patch("/profile", authMiddleware, updateProfile);
router.delete("/profile", authMiddleware, deleteProfile);

router.post("/users/:id/follow", authMiddleware, followUser);
router.post("/users/:id/unfollow", authMiddleware, unfollowUser);

export default router;