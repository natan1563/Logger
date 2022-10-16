import { elasticClient } from '../config/elastic'

export class PersonModel {
  public static async list() {
    return await elasticClient.search({ index: 'person' })
        .then(response => response?.hits?.hits)
        .catch(err => {
          throw new Error(err)  
        })
  }

  public static async create({ name, email, age}) {
    return await elasticClient.index({
      index: 'person',
      body: {name, email, age}
    })
  }

  public static async getBy(filterObject: object) {
    const query = {
      index: 'person',
      body: {
        query: {
          match: {
            ...filterObject
          }
        }
      },
      ignore_throttled: false
    }

    return await elasticClient.search(query)
  }

  public static async getById(id: string) {
    const paramObject: object = {
      "_id": id.trim()
    }

    return await PersonModel['getBy'](paramObject).then(response => response)
  }

  public static async getByName(name: string) {
    const paramObject: object = { name: name.trim() }

    return await PersonModel['getBy'](paramObject)
  }
}