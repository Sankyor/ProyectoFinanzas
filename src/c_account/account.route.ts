import { Router } from "express"
import { verifyToken } from "../Middleware/jwt.middleware";
import { AccountController } from "./account.controller";

const router = Router();
//path: http:localhost:3000 /api/v1/users

router.post('/', verifyToken, AccountController.createAccount);
/* {
 "id_user":"4fc3b1f4-7f8e-42a6-87b1-8a9366f2bd60",	
 "name":"Banco Prueba", 
 "id_account_type":"ec66ccc8-0176-4312-8209-e4405d27592e", 
 "balance":100000.00, 
 "credit_limit":1000000.00, 
 "due_date":"2024-12-05"
} */
router.get('/:id_account', verifyToken, AccountController.getAccountById);
//http://localhost:3000/api/v1/account/8a450691-ce07-43b8-8f9d-33c93c20bef6
router.get('/user/:id_user', verifyToken, AccountController.getAccountsByUser);
//http://localhost:3000/api/v1/account/user/4fc3b1f4-7f8e-42a6-87b1-8a9366f2bd60
router.patch('/', verifyToken, AccountController.updateAllOfOneById);
/* {
  "id_account": "8a450691-ce07-43b8-8f9d-33c93c20bef6",
    "id_user": "4fc3b1f4-7f8e-42a6-87b1-8a9366f2bd60",
    "name": "Banco Prueba2",
    "id_account_type": "ec66ccc8-0176-4312-8209-e4405d27592e",
    "balance": 100000.00,
    "credit_limit": 1000000.00,
    "due_date": "2024-12-05T03:00:00.000Z"
    } */
router.delete('/:id_account', verifyToken, AccountController.DeleteById);
//http://localhost:3000/api/v1/account/8a450691-ce07-43b8-8f9d-33c93c20bef6

export default router;