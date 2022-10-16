import { Router } from 'express'
import { PersonController } from '../../controller/PersonController'

export const PersonRoute = Router()

PersonRoute.post('/', PersonController.createPerson)
PersonRoute.get('/', PersonController.listPersons)
PersonRoute.get('/name', PersonController.getByName)
PersonRoute.get('/:id', PersonController.getById)