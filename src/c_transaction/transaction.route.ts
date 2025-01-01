import { Router } from "express"
import { verifyToken } from "../Middleware/jwt.middleware";
import { TransactionController } from "./transaction.controller";

const router = Router();


router.post('/', verifyToken, TransactionController.createTransaction);
/* {
  "id_user": "4fc3b1f4-7f8e-42a6-87b1-8a9366f2bd60",
  "id_account":"03cea39e-595c-4330-a191-7c0328abf471",
  "id_transaction_type":"f68ad752-86f5-41b2-832f-5b9badf66512",
  "amount": 10000000, 
  "description": "Prueba de sistema",
  "transaction_date":"2024-12-05"
} */
router.get('/:id_transaction', verifyToken, TransactionController.getTransactionById);
//http://localhost:3000/api/v1/transaction/1523639c-962f-4708-97c5-ddd9b9076da0
router.get('/user/:id_user', verifyToken, TransactionController.getTransactionsByUser);
//http://localhost:3000/api/v1/transaction/user/4fc3b1f4-7f8e-42a6-87b1-8a9366f2bd60
router.patch('/', verifyToken, TransactionController.updateAllOfOneById);
/* 
{
  "id_user": "4fc3b1f4-7f8e-42a6-87b1-8a9366f2bd60",
  "id_account":"03cea39e-595c-4330-a191-7c0328abf471",
  "id_transaction_type":"f68ad752-86f5-41b2-832f-5b9badf66512",
  "amount": 10000, 
  "description": "Prueba de sistema",
  "transaction_date":"2024-12-05"
} */
router.delete('/:id_transaction', verifyToken, TransactionController.DeleteById);
//http://localhost:3000/api/v1/transaction/1523639c-962f-4708-97c5-ddd9b9076da0



export default router;

