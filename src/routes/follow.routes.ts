import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { followUser, getFollowers, getFollowing, unfollowUser } from "../controllers/follow.controller";

const router = Router();

router.post("/:userId/follow", authMiddleware, followUser);
router.post("/:userId/unfollow", authMiddleware, unfollowUser);
router.get("/:userId/getfollowers", authMiddleware, getFollowers);
router.get("/:userId/getfollowing", authMiddleware, getFollowing);

export default router;