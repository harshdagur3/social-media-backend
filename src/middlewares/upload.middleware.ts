import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import cloudinary from "../config/cloudinary";

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req,file)=>( {
        folder: "posts",
        allowed_formats: ["jpg", "jpeg", "png"],
    }),
});

export const upload = multer({ storage });