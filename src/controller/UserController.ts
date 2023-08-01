import { Request, Response } from "express"
import { UserBusiness } from "../business/UserBusiness"
//recebe o params, body, query...
//devolve as respostas das requisições feitas pelo Business.
export class UserController {
    public getUsers = async (req: Request, res: Response) => {
        try {
            const input = {
                q: req.body.q
            }
            const userBusiness = new UserBusiness()
            const users = userBusiness.getUsers(input)
            res.status(200).send(users)
        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public createUser = async (req: Request, res: Response) => {
        try {
            const input = 
             {  id: req.body.id, 
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
             }
    
             const userBusiness = new UserBusiness()
             const response = await userBusiness.createUser(input)
            res.status(201).send(response)
        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }
}