import express from "express";
import { addProduct, getAllProduct,getByID ,deleteProductByID,updateProduct} from "../controllers/product.js";
import { authAdmin } from "../middelwares/authorized.js";

const productRouter = express.Router();

productRouter.get("/",getAllProduct )

productRouter.get("/:id",getByID)

productRouter.post("/",authAdmin,addProduct)

productRouter.delete("/:id",authAdmin,deleteProductByID)

productRouter.put("/:id",authAdmin,updateProduct )

export default productRouter;