import { Router } from "express"
import { TransactionTypeController } from "./transactionType.controller";

const router = Router();

router.get('/', TransactionTypeController.getTransactionType);



export default router;

