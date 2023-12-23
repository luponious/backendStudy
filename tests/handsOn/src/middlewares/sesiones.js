import session from 'express-session'
import connectMongo from 'connect-mongo'
import { MONGO_D, SESSION_SECRET } from '../config.js'

const store = connectMongo.create({
  mongoUrl: MONGO_D,
  ttl: 60 * 60 * 24 // 1d
})

export const sesiones = session({
  store,
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false
})

