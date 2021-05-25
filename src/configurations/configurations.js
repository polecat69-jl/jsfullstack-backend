import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()
const { PORT, 
	DEV_DATABASE_URL, 
	PROD_DATABASE_URL, 
	ENVIRONMENT} = process.env

const connectToPort = async (application) => {
	try {
		await application.listen(PORT, () => {
			console.log(`--> SERVER IS RUNNING ON PORT: ${PORT}`)
		})
	} catch (error) {
		console.error('--> ERROR OCCURD WHILE TRYING TO CONNECT TO THE PORT..')
	}
}

const connectToDatabase = async () => {
	//const DATABASE_URL = ENVIRONMENT === 'DEVELOPMENT' ? DEV_DATABASE_URL : PROD_DATABASE_URL
	try {
		await mongoose.connect("mongodb+srv://jsfullstack-version-jl:PnwaZR0uGjVOoLp2@jsfullstack-version-jl.usc9b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", 
			{ 
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true
			})
		console.log('--> SUCCESSFULLY CONNECTED TO THE DATABASE..')
	} catch (error) {
		console.log('--> ERROR WHILE TRYING TO CONNECT TO THE DATABASE..')
		process.exit()
	}
}

export default {
	connectToPort,
	connectToDatabase
}