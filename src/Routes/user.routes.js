import { Router } from "express";
import { GetAllProductHandler } from "../Controllers/user.controller.js";
const router = Router()


router.get("/all-products", GetAllProductHandler)

export default router