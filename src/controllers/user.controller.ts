import { Request, Response, NextFunction } from "express";
import  { User } from "../models/user.model";
import { AuthRequest } from "../middlewares/auth.middleware";
import bcrypt from "bcrypt";

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // @ts-ignore
        const userId = req.user.id;

        const user = await User.findById(userId).select("-password");
        if (!user) return res.status(404).json({ error: "user not found" });
        return res.status(200).json({ user });

    } catch (error) {
        next(error);
    }
}

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as AuthRequest).user?.id;
        const { username, password } = req.body;
        

        //fetches current user from db
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "user not found!" });

        //if username provided-> check uniqueness

        if (username) {
            const exists = await User.findOne({ username });
            if (exists && exists.id != userId) {
                return res.status(401).json({ error: "username already taken" });
            }
            user.username = username;
        }

        //if password provided, hash it before saving
        if (password) {
            const hashed = await bcrypt.hash(password, 10);
            user.password=hashed;
        }
        
        //save updated user
        await user.save();

        //return updated user without password
        const userObj:any = user.toObject();
        delete userObj.password;
        return res.status(200).json({ message: "Profile updated!", user: userObj });

    } catch (error) {
        next(error);
    }
}

export const deleteProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as AuthRequest).user?.id;
        if (!userId) return res.status(401).json({ error: "unauthorized" });

        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) return res.status(404).json({ error: "user not found!" });

        return res.status(200).json({ message: "Profile deleted successfully" });
    } catch (error) {
        next(error);
    }
}