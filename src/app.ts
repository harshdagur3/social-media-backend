import dotenv from "dotenv";
import express,{ Application } from "express";
import connectDB from "./config/db";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import postRoutes from "./routes/post.routes";
import likeRoutes from "./routes/likes.routes";
import followRoutes from "./routes/follow.routes";
import { swaggerDocs } from "./config/swagger";

dotenv.config();
const app = express();
connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/follows", followRoutes);

swaggerDocs(app);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));