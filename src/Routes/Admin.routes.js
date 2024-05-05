import { Router } from "express";
import { AddProductHandler, AddProductStock, DeleteProductHandler } from "../Controllers/Admin.controller.js";
import { uploadImage } from "../Middlewares/multer.middleware.js";


const router = Router();


router.post("/add-product", uploadImage.fields([{ name: "productImage", maxCount: 1 }]), AddProductHandler)
router.put("/add-stock", AddProductStock)
router.delete("/delete-product", DeleteProductHandler)
export default router;