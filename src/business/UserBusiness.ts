import { UserDatabase } from "../database/UserDatabase"
import { User } from "../models/User"
import { UserDB } from "../types"

//Recebe o req do controller e faz a ligação com o UserDatabase e devolve para o controler o resultado da busca.
export class UserBusiness {
    public getUsers = async (input: any) => {
        const { q } = input

        const userDatabase = new UserDatabase()
        const usersDB = await userDatabase.findUsers(q)

        const users: User[] = usersDB.map((userDB) => new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
            userDB.created_at
        ))
        return users
    }
//Recebe o req do controller, faz as verificações
//faz a ligação com o UserDatabase, userDatabase busca no banco de dados
//devolve para o controler o resultado da busca.
    public createUser = async (input: any) => {
        const { id, name, email, password } = input
        if (typeof id !== "string") {
            throw new Error("'id' deve ser string")
        }
        if (typeof name !== "string") {
            throw new Error("'name' deve ser string")
        }
        if (typeof email !== "string") {
            throw new Error("'email' deve ser string")
        }
        if (typeof password !== "string") {
            throw new Error("'password' deve ser string")
        }
        const userDatabase = new UserDatabase()
        const userDBExists = await userDatabase.findUserById(id)

        if (userDBExists) {
            throw new Error("'id' já existe")
        }

        const newUser = new User(
            id,
            name,
            email,
            password,
            new Date().toISOString()
        )

        const newUserDB: UserDB = {
            id: newUser.getId(),
            name: newUser.getName(),
            email: newUser.getEmail(),
            password: newUser.getPassword(),
            created_at: newUser.getCreatedAt()
        }

        await userDatabase.insertUser(newUserDB)
        const output = {
            message: "Usuário cadastrado com sucesso!",
            user: newUser
        }

        return output
    }
}

