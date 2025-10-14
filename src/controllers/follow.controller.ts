import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { Follow } from "../models/follow.model";
import { User } from "../models/user.model";


export const followUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const followerId = (req as AuthRequest).user?.id;
        const { userId } = req.params;

        if (!followerId) return res.status(401).json({ error: "Unauthorized" });
        if (followerId == userId) return res.status(400).json({ error: "Cannot follow yourself!" });

        const alreadyFollowing = await Follow.findOne({ follower: followerId, following: userId });
        if (alreadyFollowing) return res.status(400).json({ message: "Already Following!" });

        await Follow.create({ follower: followerId, following: userId });
        return res.status(200).json({ message: "User followed Successfully!" });
    } catch (error) {
        next(error);
    }
}

export const unfollowUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const followerId = (req as AuthRequest).user?.id;
        const userId = req.params;
        if (!followerId) return res.status(401).json({ error: "Unauthorized" });

        const followRecord = await Follow.findOne({ follower: followerId, following: userId });
        if (!followRecord) return res.status(404).json({ error: "You are following this user" });
        await followRecord.deleteOne();
        return res.status(200).json({ message: "Unfollowed Succcessfully!" });
    } catch (error) {
        next(error);
    }
}

export const getFollowers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;

        const followers = await Follow.find({ following: userId }).populate("follower", "username");
        return res.status(200).json({ count: followers.length, followers });
    } catch (error) {
        next(error);
    }
}

export const getFollowing = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;

        const following = await Follow.find({ follower: userId }).populate("following", "username");
        return res.status(200).json({ count: following.length, following });
    } catch (error) {
        next(error);
    }
}