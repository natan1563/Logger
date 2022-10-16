import { PersonModel } from '../model/PersonModel'
import { Request, Response } from 'express'
import { Person } from '../interfaces/PersonInterface'
import { elasticClient } from '../config/elastic'

export class PersonController {

  public static async listPersons(req: Request, res: Response) {
    try {
      const responseDocs = await PersonModel.list()
      res.json(responseDocs)
    } catch (err) {
      res.status(500).json({
        error: err.message
      })
    }
  }

  public static async createPerson(req: Request, res: Response) {
    try {
      const { name, email, age }: Person = req.body

      await PersonModel.create({name, email, age})
      .then(() => {
        return res
          .status(201)
          .json({
            message: "Pessoa criada com sucesso",
          })
      })
      .catch((err) => {
        console.log(err.message)
        throw new Error("Falha ao salvar a pessoa")
      })
    } catch (err) {
      res
        .status(500)
        .json({
          error: err.message
        })
    }
  }

  public static async getByName(req: Request, res: Response) {
    try {
      const { personName }: { personName: string } = req.query

      const responseData = await PersonModel.getByName(personName)
      .then(response => response?.hits?.hits)
      .catch(err => {
        throw new Error(err.message)
      })

      res.json(responseData)
    } catch (err) {
      res
        .status(500)
        .json({
          error: err.message
        })
    }
  }

  public static async getById(req: Request, res: Response) {
    try {
      const { id }: { id: string } = req.params
    
      PersonModel.getById(id)
      .then(response => {
        return res.json(response?.hits?.hits)
      })
      .catch(err => {
        throw new Error(err.message)
      })
    } catch (err) {
      return res
        .status(500)
        .json({error: err.message})
    }
  } 
}