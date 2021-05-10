import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import UserRoutes from './src/routes/User.Routes.js'
import Configurations from './src/configurations/configurations.js'
import Middlewares from './src/middlewares/Middlewares.js'

const application = express()
application.use(express.json())
application.use(morgan('common'))
application.use(helmet())

UserRoutes.routes(application)

application.use(Middlewares.notFound)
Configurations.connectToPort(application)
Configurations.connectToDatabase()

/* application.get('/payment', (request, response) => {
    response.redirect('https://google.se/') 
})

	const isOrderPaidFor = (request, response, next) => {
	console.log('PAYMENT VERIFIED')
	next()
}

application.get('/order', isOrderPaidFor, (request, response) => {
	response.send('ORDER ACCEPTED: ' + Math.random())
})*/