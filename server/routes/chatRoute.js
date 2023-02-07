const express = require('express');
const chatRoute = express.Router()
const { postChat, getChat } = require("../controllers/chatController")


chatRoute.post("/send", postChat)
chatRoute.get("/get/:room", getChat)

module.exports = chatRoute
