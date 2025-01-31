import { Router } from "express"
import { userController } from "./user.controller";
import { verifyToken } from "../Middleware/jwt.middleware";

const router = Router();

router.get('/by-email', verifyToken, userController.getUserByEmail);
router.get('/', verifyToken, userController.getUserByIdLoged);
router.patch('/', verifyToken, userController.updateUserById);
router.delete('/', verifyToken, userController.sleepUserById);


export default router;

