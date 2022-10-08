import 'dotenv/config'
import express from 'express'
import { router } from './routes/index'

const port = process.env.APP_PORT
const app = express()

app.use(express.json())
app.use(router)

app.listen(port, () => {
  console.log(`The server has running in http://localhost:${port}`)
})