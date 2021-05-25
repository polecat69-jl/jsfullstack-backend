import UserController from '../controllers/User.controller.js'

const routes = application => {
	application.post('/user', UserController.createUser)
	application.get('/user', UserController.getAllUsers)
	application.get('/user/:userid', UserController.getUserByID)
	application.delete('/user/:userid', UserController.deleteUserByID)
	application.put('/updateuser/:userid', UserController.updateUser)
	application.get('/search/user', UserController.getUserWithQuery)
}


export default { routes }