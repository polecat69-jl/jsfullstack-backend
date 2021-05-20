import Chai from 'chai'
import ChaiHTTP from 'chai-http'
import { describe, it as test }  from 'mocha'
import application from '../Server.js'

Chai.should()
Chai.use(ChaiHTTP)

const randomString = Math.random().toString(36).substring(7)

const testingNonExistentRoute = () => {
	test('Expecting 404 NOT_FOUND', done => {
		Chai.request(application)
			.get(`/${randomString}`)
			.end((request, response) => {
				response.should.have.a.status(404)
				done()
			})
	})
}

const GetAllUsers = () => {
	test('Fetch(GET) all users from database', done => {
		Chai.request(application)
			.get('/user')
			.end((request, response) => {
				response.should.have.a.status(200)
				response.body.should.be.a('array')
				response.body.length.should.be.eq(response.body.length)
				done()
			})
	})
}

const CreateUser = () => {

	const mockData = {
		username: randomString,
		password: randomString
	}

	test('Create(POST) method for user entity', done => {
		Chai.request(application)
			.post('/user')
			.send(mockData)
			.end((request, response) => {
				response.should.have.a.status(201)
				response.body.should.be.a('object')
				response.body.should.have.property('username').eq(mockData.username)
				response.body.should.have.property('password').eq(mockData.password)
				done()
			})
	})
}

const getUserWithQuery = () => {

	test('GET User with Query', done => {
		Chai.request(application)
			.get('/search/user?name=Klara')    
			.end((request, response) => {
				response.should.have.a.status(200)                
				done()
			})
	})
}

const deleteUserByID = () => {
	test('DELETE User from Database with UserID', done => {
		Chai.request(application)
			.delete('/user/60a6237edc06d73ec0d6fcdd')
			.end((request, response) => {
				response.should.have.a.status(200)
				done()
			})
	})
}

const updateUser = () => {

	const randomString = Math.random().toString(36).substring(7)
	const randomString2 = Math.random().toString(36).substring(7)

	const mockData = {
		username: randomString,
		password: randomString2
	}

	test('PUT Update user in database', done => {
		Chai.request(application)
			.put('/updateuser/60a62424dcafc8401cdeb09a')
			.send(mockData)
			.end((request, response) => {
				response.should.have.a.status(200)
                response.body.should.be.a('object')
				response.body.should.have.property('username').eq(mockData.username)
				response.body.should.have.property('password').eq(mockData.password)
				done()
			})
	})
}


describe('TESTING USER_API ROUTE', () => {
	testingNonExistentRoute(),
	GetAllUsers(),
	CreateUser(),
	updateUser(),
	getUserWithQuery(),
	deleteUserByID()
})