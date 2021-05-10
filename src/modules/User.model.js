import mongoose from 'mongoose'
const { Schema } = mongoose

const userSchema = Schema({
	username: {
		type: String,
		unique: true, 
		allowNull: false,
		required: true,
		lowercase: true,
		minlength: [5, 'USERNAME MUST BE LONGER THEN 5 CHARACTERS'],
		maxlength: [20, 'USERNAME TO LONG MAX 20 CHARACTERS']
	},
	password: {
		type: String,
		required: true,
		allowNull: false       
	}
})

const UserModel = mongoose.model('user', userSchema)

export default UserModel