import { Request, Response } from "express"
import { AccountDatabase } from "../database/AccountDatabase"
import { Account } from "../models/Account"
import { AccountDB } from "../types"
import { AccountBusiness } from "../business/AccountBusiness"
//recebe o params, body, query...
// faz ligação com o business
//recebe o resultado e envia.
export class AccountController {
    public getAccounts = async (req: Request, res: Response) => {
        try {
            const accountBusiness = new AccountBusiness()
            const accounts = await accountBusiness.getAccounts()
            res.status(200).send(accounts)
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
//recebe o params, body, query...
// faz ligação com o business
//recebe o resultado e envia.
    public getAccountBalance = async (req: Request, res: Response) => {
        try {
            const input = {
                id:req.params.id
            }
            const accountBusiness = new AccountBusiness()
            const balance = await accountBusiness.getAccountBalance(input)
            res.status(200).send({ balance })
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

    public createAccount = async (req: Request, res: Response) => {
        try {
            const input = {
                id: req.body.id,
                ownerId: req.body.ownerId
            }
            const accountBusiness = new AccountBusiness()
            const response = accountBusiness.createAccount(input)
            
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

    public editAccountBalance = async (req: Request, res: Response) => {
        try {
            const input = {
                id: req.params.id,
                value: req.body.value
            }

            const accountBusiness = new AccountBusiness()
            const account = accountBusiness.editAccountBalance(input)
            res.status(200).send(account)
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