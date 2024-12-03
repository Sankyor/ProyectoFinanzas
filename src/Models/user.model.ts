import { readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { User } from "../Interfaces/user.interface"


// import { stringify } from "node:querystring"
// import { writeFile } from "node:fs"
const __dirname = import.meta.dirname //existe naturalmente en el require
const pathFile = path.resolve(__dirname, "../Data/users.json")
//console.log(__dirname)

const readUsers = async () => {
    const usersJSON = await readFile(pathFile, "utf-8")
    const users = JSON.parse(usersJSON) as User[] //mejor forma de tipar
    return users;
}
const writeUser = async (users: User[]) => {
    const usersJSON = JSON.stringify(users, null, 2);
    return await writeFile(pathFile, usersJSON)
}

const writeUsers = async (users: User[]) => {
    const usersJSON = JSON.stringify(users, null, 2);
    return await writeFile(pathFile, usersJSON); //no obligatorio el return
}


export const UserModel = {
    readUsers,
    writeUser,
    writeUsers
}