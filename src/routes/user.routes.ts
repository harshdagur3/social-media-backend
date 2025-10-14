import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { deleteProfile, getProfile, updateProfile } from "../controllers/user.controller";

const router = Router();

router.get("/profile", authMiddleware, getProfile);
router.patch("/profile", authMiddleware, updateProfile);
router.delete("/profile", authMiddleware, deleteProfile);

export default router;