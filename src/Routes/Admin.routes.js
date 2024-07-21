import { Router } from "express";
import { AddProductHandler, AddProductStock, DeleteProductHandler, DiscountHandler, ExpenseHandler, LedgerHandler, RemoveDiscountHandler, SheetHandler } from "../Controllers/Admin.controller.js";
import { uploadImage } from "../Middlewares/multer.middleware.js";


const router = Router();


router.post("/add-product", uploadImage.fields([{ name: "productImage", maxCount: 1 }]), AddProductHandler)
router.put("/add-stock", AddProductStock)
router.delete("/delete-product", DeleteProductHandler)
router.post("/discount", DiscountHandler)
router.post("/expense", ExpenseHandler)
router.get("/sheet", SheetHandler)
router.get("/ledger", LedgerHandler)
router.put("/dicount-remove", RemoveDiscountHandler)
export default router;