import { Router, Request, Response } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getProfile } from "../controllers/user.controller";

const router = Router();

router.get("/profile", authMiddleware, getProfile);

export default router;