import { Router } from "express";
import { OrderHandler } from "../Controllers/Order.controller.js";

const router = Router();

router.post("/new-order", OrderHandler)

export default router