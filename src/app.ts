import express,{ Application,Request,Response } from "express";
import connectDB from "./config/db";
import dotenv from "dotenv";

dotenv.config();
const app: Application = express();
connectDB();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("APi running");
})

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));