import dotenv from "dotenv";
import express,{ Application } from "express";
import connectDB from "./config/db";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import postRoutes from "./routes/post.routes";
import likeRoutes from "./routes/likes.routes";
import followRoutes from "./routes/follow.routes";

dotenv.config();
const app: Application = express();
connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/", userRoutes);
app.use("/api", postRoutes);
app.use("/api", likeRoutes);
app.use("/api/", followRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));