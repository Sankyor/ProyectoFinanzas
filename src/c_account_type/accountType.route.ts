import { Router } from "express"
import { AccountTypeController } from "./accountType.controller";

const router = Router();

router.get('/', AccountTypeController.getAccountsType);


export default router;

