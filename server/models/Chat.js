const mongoose = require("mongoose")
const chatSchema = mongoose.Schema({
	from: {
		type: String,
		required: true
	},
	room: {
		type: String,
		required: true
	},
	text: {
		type: String,
		required: true
	},
	date_sent: {
		type: Date,
		default: Date.now()
	}
})

const ChatModel = mongoose.model("Chat", chatSchema, "chats")

module.exports.Chat = ChatModel
