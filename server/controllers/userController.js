const { User } = require("../models/User")
const bcrypt = require("bcrypt")

const errorHandler = (type, error) => {
	if (type === "register") {
		if (error.code === 11000) {
			return { message: "Username has been taken" }
		} else if (error._message === "User validation failed") {
			return { message: error.errors.username?.properties.message || error.errors.password?.properties.message }
		}
	} else if (type === "login") {
		return { message: `${error}` }
	}
}
const registerController = async (req, res) => {
	try {
		const { firstname, lastname, username, password } = req.body
		// console.log(username)
		const user = await User.create({ firstname, lastname, username, password })
		res.status(201).send({ message: "User has been created successfully" })
	} catch (error) {
		console.log(error)
		let message = errorHandler("register", error)
		res.status(400).send(message)
	}
}

const loginController = async (req, res) => {
	const { username, password } = req.body
	try {
		const user = await User.findOne({ username })
		if (!user) {
			throw (new Error().message = "Username not found")
		}
		const checkPassword = await bcrypt.compare(password, user.password)
		if (checkPassword === false) {
			throw (new Error().message = "Password is incorrect")
		} else {
			// req.session.userid = user.username
			res.status(200).send({ message: "Logged in", userID: user._id })
		}
	} catch (error) {
		let message = errorHandler("login", error)

		res.status(400).send(message)
	}
}

const logoutController = (req, res) => {
	// req.session.destroy()
	// res.redirect("/")
}

module.exports = {
	register: registerController,
	login: loginController,
	logout: logoutController
}
