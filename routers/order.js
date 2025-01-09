import { Router } from "express";
import { updateStatusOrder, getByUserId, deleteOrderByID, addOrder, getAllOrders } from "../controllers/order.js"

const router = Router();
router.get("/", getAllOrders);
router.get("/:id", getByUserId);
router.delete("/:id", deleteOrderByID);
router.post("/", addOrder);
router.put("/:id", updateStatusOrder);

export default router;