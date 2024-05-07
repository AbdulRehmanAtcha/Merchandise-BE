import { Router } from "express";
import { AddProductHandler, AddProductStock, DeleteProductHandler, DiscountHandler } from "../Controllers/Admin.controller.js";
import { uploadImage } from "../Middlewares/multer.middleware.js";


const router = Router();


router.post("/add-product", uploadImage.fields([{ name: "productImage", maxCount: 1 }]), AddProductHandler)
router.put("/add-stock", AddProductStock)
router.delete("/delete-product", DeleteProductHandler)
router.post("/discount", DiscountHandler)
export default router;