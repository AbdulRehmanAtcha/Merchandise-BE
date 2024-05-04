import { Router } from "express";
import { AddProductHandler } from "../Controllers/Admin.controller.js";
import { uploadImage } from "../Middlewares/multer.middleware.js";


const router = Router();


router.post("/add-product", uploadImage.fields([{ name: "productImage", maxCount: 1 }]) ,AddProductHandler)
export default router;