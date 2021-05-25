import UserModel from '../modules/User.model.js'
import StatusCode from '../configurations/StatusCode.js'
import { request, response } from 'express'

const createUser = async (request, response) => {

	const user = new UserModel({
		username: request.body.username,
		password: request.body.password
	})

	try {
		const databaseResponse = await user.save()
		response.status(StatusCode.CREATED).send(databaseResponse)
	} catch (error) {
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
	}
}

const getAllUsers = async (request, response) => {
	try {
		const databaseResponse = await UserModel.find()
		response.status(StatusCode.OK).send(databaseResponse)
	} catch (error) {
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
	}
}

const getUserByID = async (request, response) => {
	try {
		const databaseResponse = await UserModel.findOne({ _id: request.params.userid })
		response.status(StatusCode.OK).send(databaseResponse)
	} catch (error) {
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
	}
}

const deleteUserByID = async (request, response) => {
	try {
		const databaseResponse = await UserModel.findByIdAndDelete(request.params.userid)
		response.status(StatusCode.OK).send({
			message: `Successfully deleted the user ${databaseResponse.username}`
		})
	} catch (error) {
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({
			message: `Error occured while trying to delete user with id: ${request.params.userid}`,
			stackTrace: error.message
		})
	}
}

const updateUser = async (request, response) => {

	const data = new UserModel({
		username: request.body.username,
		password: request.body.password
	})
	try {
		if (!request.body.username) {
			return response.status(StatusCode.BAD_REQUEST).send({ message: 'Empty values are not valid!!' })
		}
		const databaseResponse = await UserModel.findByIdAndUpdate(request.params.userid, data, { new: true })
		response.status(StatusCode.OK).send(databaseResponse)

	} catch (error) {
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
	}
}

const getUserWithQuery = async (request, response) => {

	try {
		const databaseResponse = await UserModel.find({ username: request.query.name })

		databaseResponse.length !== 0
			? response.status(StatusCode.OK).send(databaseResponse)
			: response.status(StatusCode.NOT_FOUND).send({ message: `Could not find user ${request.query.name}` })
	} catch (error) {
		response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
	}
}

export default {
	createUser,
	getAllUsers,
	getUserByID,
	deleteUserByID,
	updateUser,
	getUserWithQuery
}