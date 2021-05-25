import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import UserRoutes from './src/routes/User.Routes.js'
import Configurations from './src/configurations/configurations.js'
import Middlewares from './src/middlewares/Middlewares.js'
import path from 'path'

const application = express()
application.use(express.json())
application.use(cors({ credential: true}))
application.use(morgan('common'))
application.use(helmet())
UserRoutes.routes(application)
application.use(Middlewares.notFound)

application.use(express.static(path.join('../jsfullstack/build')))

Configurations.connectToPort(application)
Configurations.connectToDatabase()

export default application