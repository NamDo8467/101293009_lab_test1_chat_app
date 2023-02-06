const express = require("express")
const userRoute = express.Router()
const { login, register, logout } = require("../controllers/userController")

/* USER ROUTE */
userRoute.post("/register", register)
userRoute.post("/login", login)

// userRoute.post("/logout", logout)

module.exports = userRoute
