import dotenv from "dotenv";
import express,{ Application } from "express";
import connectDB from "./config/db";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import postRoutes from "./routes/post.routes";

dotenv.config();
const app: Application = express();
connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/", userRoutes);
app.use("/api", postRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));