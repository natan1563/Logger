import { Router } from 'express';
import { PersonRoute } from './person/index'

export const router = Router()

router.use('/person', PersonRoute)