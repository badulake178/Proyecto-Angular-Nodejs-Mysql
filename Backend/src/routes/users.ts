import { Router } from "express";
import { register } from "../controllers/users";

const router = Router();

router.post('/api/user/register', register);

export default router;