import { Router } from "express"
import { verifyToken } from "../Middleware/jwt.middleware";
import { TransactionController } from "./transaction.controller";

const router = Router();


router.post('/', verifyToken, TransactionController.createTransaction);
router.get('/:id_transaction', verifyToken, TransactionController.getTransactionById);
router.get('/user/:id_user', verifyToken, TransactionController.getTransactionsByUser);
router.patch('/', verifyToken, TransactionController.updateAllOfOneById);
router.delete('/:id_transaction', verifyToken, TransactionController.DeleteById);


export default router;

