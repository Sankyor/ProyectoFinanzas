import { Request, Response } from "express"
import { userService } from "../Services/user.service"


const getUserById = async (req: Request, res: Response) => {
    try {
        const { id_user } = req.params;
        const user = await userService.getUserById(id_user)
        res.json(user)
    } catch (error) {
        console.log(error)
        if (error instanceof Error) {
            res.status(500).json({ error: error.message })
        } else res.status(500).json({ error: "Error de servidor" })
    }
}

const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password_hash, created_at } = req.body
        if (!name || !email || !password_hash || !created_at) {
            res.status(304).json({ error: "Error de servidor" })
            throw new Error("Error al agregar usuario, dato faltante")
        }
        const newUser = await userService.createUser(req.body);
        res.json({ newUser })

    } catch (error) {
        console.log(error)
        if (error instanceof Error) {
            res.status(500).json({ error: error.message })
            return;
        }
        res.status(500).json({ error: "Error de servidor" })
    }
}

export const userController = {
    getUserById,
    createUser
}