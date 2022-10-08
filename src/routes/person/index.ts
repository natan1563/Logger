import { Router } from 'express'
import { PersonController } from '../../controller/PersonController'

export const PersonRoute = Router()

PersonRoute.post('/', PersonController.createPerson)