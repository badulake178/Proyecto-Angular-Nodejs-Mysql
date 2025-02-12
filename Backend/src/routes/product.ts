import { Router } from "express";
import { getProducts, registerProduct } from "../controllers/product";
import validateToken from "./validateToken";

const router = Router();

router.post('/api/v1/product/registerProduct', registerProduct);
router.get('/api/v1/product/getAllProduct',validateToken, getProducts);


export default router;