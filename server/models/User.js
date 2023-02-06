const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const userSchema = mongoose.Schema({
	firstname: {
		type: String
	},
	lastname: {
		type: String
	},
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	// tweets: [{ content: { type: String, required: true }, date: { type: Date, required: true, default: Date.now } }]
	createon: {
		type: Date,
		default: Date.now()
	}
})
userSchema.pre("save", async function (next) {
	const salt = await bcrypt.genSalt()
	this.password = await bcrypt.hash(this.password, salt)
	next()
})
const UserModel = mongoose.model("User", userSchema, "users")

module.exports.User = UserModel
