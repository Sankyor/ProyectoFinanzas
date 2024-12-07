import { Router } from "express"
import { userController } from "../Controllers/user.controller";
import { verifyToken } from "../Middleware/jwt.middleware";

const router = Router();
//path: http:localhost:3000 /api/v1/users

router.get('/getUser/:', verifyToken, userController.getUserById);
//router.post('/createUser', verifyToken, userController.createUser);

//crear un usuario
// router.post('/', userController.createUser)

// crear un usuario
// eliminar un usuario por id
// actualizar un usuario por id

export default router;

