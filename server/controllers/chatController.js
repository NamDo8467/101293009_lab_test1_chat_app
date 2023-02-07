const { User } = require("../models/User")
const { Chat } = require("../models/Chat")

const errorHandler = (type, error) => {
	if (type === "postChat") {
		if (error._message === "Chat validation failed") {
			return { message: error.errors.from?.message || error.errors.to?.message || error.errors.message?.message }
		} else {
			return { message: `${error}` }
		}
	} else if (type === "getChat") {
		return { message: `${error}` }
	}
}
const postChatController = async (req, res) => {
	const { from, room, message } = req.body

	try {
		const senderIsFound = await User.findOne({ username: from })
		// const receiverIsFound = await User.findOne({ username: to })
		if (senderIsFound) {
			const chat = await Chat.create({ from, room, message })
			res.status(201).json({ message: "Message sent" })
		} else {
			throw (new Error().message = "User not found")
		}
	} catch (error) {
		let message = errorHandler("postChat", error)
		res.status(400).send(message)
	}
}

const getChatController = async (req, res) => {
	const { room } = req.params
	console.log(req.params)
	try {
		const chats = await Chat.find({ room })
		res.status(200).send(chats)
	} catch (error) {
		console.log(error)
	}
}

module.exports = {
	postChat: postChatController,
	getChat: getChatController
}
