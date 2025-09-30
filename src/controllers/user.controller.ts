import { Request, Response, NextFunction } from "express";
import  { User } from "../models/user.model";

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //@ts-ignore
        const userId = req.user.id;

        const user = await User.findById(userId).select("-password");
        if (!user) return res.status(404).json({ error: "user not found" });
        return res.status(200).json({ user });

    } catch (error) {
        next(error);
    }
}