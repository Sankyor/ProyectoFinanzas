import { Router } from "express"
import { userController } from "../Controllers/user.controller";
import { verifyToken } from "../Middleware/jwt.middleware";

const router = Router();
//path: http:localhost:3000 /api/v1/users


//?router.use(verifyToken) //todas las rutas quedarian protegidas

// leer los usuarios
router.get('/', verifyToken, userController.getUsers);
// leer un unico usuario por id
router.get('/:id', verifyToken, userController.getUser);
router.get('/write', verifyToken, userController.getUser);

//crear un usuario
// router.post('/', userController.createUser)

// crear un usuario
// eliminar un usuario por id
// actualizar un usuario por id

export default router;

// /auth/        ->
// /login       -> verificar credenciales, se devuelve JWT
// /register    -> crear un usuario