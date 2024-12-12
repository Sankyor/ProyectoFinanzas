import { Router } from "express"
import { userController } from "../Controllers/user.controller";
import { verifyToken } from "../Middleware/jwt.middleware";

const router = Router();
//path: http:localhost:3000 /api/v1/users

router.get('/by-email', verifyToken, userController.getUserByEmail);
//http://localhost:3000/api/v1/user/by-email?email=nico@mail.com
router.patch('/', verifyToken, userController.updateUserById);
/* {
    "name": "Nicolas",
    "email": "UsuarioCorrecto@mail.com",
  } */
router.delete('/by-email', verifyToken, userController.sleepUserById);
//router.post('/createUser', verifyToken, userController.createUser);


export default router;

