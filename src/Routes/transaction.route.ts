import { Router } from "express"
import { verifyToken } from "../Middleware/jwt.middleware";
import { TransactionController } from "../Controllers/transaction.controller";

const router = Router();

// leer los usuarios
router.post('/create_transaction', verifyToken, TransactionController.createTransaction);
// leer un unico usuario por id
router.get('/transaction_id/:', verifyToken, TransactionController.getTransactionById);
router.get('/transactions', verifyToken, TransactionController.getTransactionsByUser);



export default router;

