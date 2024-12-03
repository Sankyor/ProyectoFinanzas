import { Router } from "express";

import { authController } from "../Controllers/auth.controller";

const router = Router();

router.post("/login", authController.login)
router.post("/register", authController.register);


export default router