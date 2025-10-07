import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model";
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
            user.password = hashed;
        }

        //save updated user
        await user.save();

        //return updated user without password
        const userObj: any = user.toObject();
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

export const followUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId: any = (req as AuthRequest).user?.id;
        const targetUserId: any = req.params.id;
        if (!userId) return res.status(401).json({ error: "Unauthorized" });
        if (targetUserId == userId) return res.status(400).json({ error: "Cannot follow yourself!" });

        const user = await User.findById(userId);
        const targetUser = await User.findById(targetUserId);

        if (!targetUser) return res.status(404).json({ error: "user not found!" });

        //check if already following
        if (user?.following.includes(targetUserId)) {
            return res.status(400).json({ error: "Already following" });
        }

        //push objectId's to following & followers array accordingly...
        user?.following.push(targetUserId);
        targetUser.followers.push(userId);

        await user?.save();
        await targetUser.save();

        return res.status(200).json({ message: "User followed Succussfully!" });
    } catch (error) {
        next(error);
    }
}

export const unfollowUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as AuthRequest).user?.id;
        const targetUserId: any = req.params.id;

        const user = await User.findById(userId);
        const targetUser = await User.findById(targetUserId);
        if (!targetUser) return res.status(404).json({ error: "user not found" });
        if (!user?.following.includes(targetUserId)) {
            return res.status(400).json({ error: "Already not following" });
        }

        user.following = user.following.filter(id => id.toString() !== targetUserId);
        targetUser.followers = targetUser?.followers.filter(id => id.toString() !== userId);

        await user.save();
        await targetUser.save();

        return res.status(200).json({ message: "Unfollowed user Succussfully!" });
    } catch (error) {
        next(error);
    }
}

export const getFollowers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id || (req as AuthRequest).user?.id;
        const user = await User.findById(userId).populate("followers", "username");
        if (!user) return res.status(404).json({ error: "user not found" });
        return res.status(200).json(user.followers);
    } catch (error) {
        next(error);
    }
}

export const getFollowing = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id || (req as AuthRequest).user?.id;
        const user = await User.findById(userId).populate("following", "username");
        if (!user) return res.status(404).json({ error: "user not found" });
        return res.status(200).json(user.following);
    } catch (error) {
        next(error);
    }
}