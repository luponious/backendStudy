import express from 'express'
import mongoose from 'mongoose'
import { engine } from 'express-handlebars'

import { MONGO_D, PORT } from './config.js'
import { apiRouter } from './routers/api/apirest.router.js'
import { webRouter } from './routers/web/web.router.js'
import { sesiones } from './middlewares/sesiones.js'

await mongoose.connect(MONGO_D)
console.log(`conectado a base de datos en: "${MONGO_D}"`)

export const app = express()

app.engine('handlebars', engine())

app.listen(PORT, () => {
  console.log(`servidor escuchando peticiones en puerto: ${PORT}`)
})

app.use('/static', express.static('./static'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(sesiones)

app.use('/', webRouter)
app.use('/api', apiRouter)