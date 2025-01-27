import { Router } from "express";
import { registerProduct } from "../controllers/product";

const router = Router();

router.post('/api/v1/product/register', registerProduct);


export default router;