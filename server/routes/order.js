import express from "express";
import { addOrder,deleteOrderByID,updateOrderIsSending,getOrderByIdUser,getAllOrders} from "../controllers/order.js";
import { auth,authAdmin } from "../middelwares/authorized.js";

const orderRouter = express.Router();

orderRouter.get("/",authAdmin,getAllOrders)

orderRouter.get("/byUser",auth,getOrderByIdUser)

orderRouter.post("/",auth,addOrder)

orderRouter.delete("/:id",auth,deleteOrderByID)

orderRouter.put("/:id",authAdmin,updateOrderIsSending )

export default orderRouter;