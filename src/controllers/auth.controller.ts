import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model";
import { signupSchema } from "../validations/auth.validation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { constants } from "../constants";


export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsed = signupSchema.parse(req.body);

        // check existing user
        const exists = await User.findOne({ username: parsed.username });
        if (exists) return res.status(400).json({ error: "User already exists!" });

        //hash the password
        const hashed = await bcrypt.hash(parsed.password, 10);

        //create user
        const user = await User.create({ username: parsed.username, password: hashed });

        return res.status(201).json({ message: "user created!" });

    } catch (error) {
        next(error);
    }
}


export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body;
    
        const user = await User.findOne({ username });
        if (!user) return res.status(401).json({ error: "Invalid credentials!" });

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(401).json({ error: "Invalid credentials!" });

        const token = jwt.sign({ id: user._id }, constants.JWT_SECRET, { expiresIn: "1h" });
    
        res.json({ message: "Login Successful!",token });

    } catch (error) { 
        res.status(500).json({ error: "Server error" });
    }
}