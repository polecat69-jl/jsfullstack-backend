import UserController from '../controllers/User.controller.js'

const routes = application => {
	application.post('/user', UserController.createUser)
	application.get('/user', UserController.getAllUsers)
	application.get('/user/:userid', UserController.getUserByID)
	application.delete('/user/:userid', UserController.deleteUserByID)
	application.put('/user/:userid', UserController.updateUser)
}


export default { routes }
