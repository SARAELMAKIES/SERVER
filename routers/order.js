import { Router } from "express";
import { updateStatusOrder, getByUserId, deleteOrderByID, addOrder, getAllOrders } from "../controllers/order.js"
import {  isUserIn, isUserManager } from "../middlewares/isUserIn.js";

const router = Router();
router.get("/", isUserManager,getAllOrders);
router.get("/:id", getByUserId);
router.delete("/:id",isUserManager, deleteOrderByID);
router.post("/",isUserIn, addOrder);
router.put("/:id",isUserManager, updateStatusOrder);

export default router;