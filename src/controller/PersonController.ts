import { elasticClient } from '../config/elastic'

export class PersonController {
  public static async createPerson(req, res, next) {
    try {
      const { name, email, age } = req.body

      await elasticClient.index({
        index: 'person',
        body: {name, email, age}
      })
      .then(() => {
        return res
          .status(201)
          .json({
            "message": "Pessoa criada com sucesso"
          })
      })
      .catch(() => {
        throw new Error("Falha ao salvar a pessoa")
      })
    } catch (err) {
      console.error(err.message)

      res
        .status(500)
        .json({
          error: err.message
        })
    }
  }

  public static async getByName(req, res, next) {
    try {
      const { text } = req.body

      elasticClient.search({
        body: {
          query: {
            wildcard: { "name": `${text.trim()}` }
          }
        }
      })
      .then(response => {
        return res.json(response)
      })
      .catch(err => {
        throw new Error(err.message)
      })
    } catch (err) {
      res
        .status(500)
        .json({
          error: err.message
        })
    }
  }

  public static async getById(req, res, next) {
    try {
      const { id } = req.params
    
      elasticClient.search({
        body: {
          query: {
            match: {
              "_id": id
            }
          }
        }
      })
      .then(response => {
        return res.json(response)
      })
      .catch(err => {
        throw new Error(err.message)
      })
    } catch (err) {
      return res.status(500).json({error: err.message})
    }
  } 
}