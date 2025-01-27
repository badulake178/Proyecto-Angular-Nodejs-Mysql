import { Router } from "express";
import { registerUser } from "../controllers/users";
import { login } from "../controllers/users";

const router = Router();

router.post('/api/v1/user/register', registerUser);
router.post('/api/v1/user/login', login);

export default router;