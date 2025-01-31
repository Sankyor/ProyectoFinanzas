import { Router } from "express"
import { verifyToken } from "../Middleware/jwt.middleware";
import { AccountController } from "./account.controller";

const router = Router();

router.post('/', verifyToken, AccountController.createAccount);
router.get('/:id_account', verifyToken, AccountController.getAccountById);
router.get('/user/:id_user', verifyToken, AccountController.getAccountsByUser);
router.patch('/', verifyToken, AccountController.updateAllOfOneById);
router.delete('/:id_account', verifyToken, AccountController.DeleteById);

export default router;