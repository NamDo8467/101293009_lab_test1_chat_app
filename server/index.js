const express = require("express")
const app = express()
const http = require("http")
const cors = require("cors")
const server = http.createServer(app)
const userRoute = require("./routes/userRoute")
const mongoose = require("mongoose")
const socketio = require("socket.io")
const { addUser, getUser, removeUser, getUsersInRoom } = require("./users")
const URI = "mongodb+srv://namdo:namdo@cluster0.qftfl.mongodb.net/comp3133_lab_test1_chat_app?retryWrites=true&w=majority"
const io = socketio(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"]
	}
})

app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/user", userRoute)

// app.set("socketIo", server)

const PORT = process.env.PORT || 5000
io.on("connection", socket => {
	console.log("New connection")

	socket.on("joinRoom", ({ name, room }) => {
		const user = addUser(socket.id, name, room)

		socket.emit("message", { user: "admin", text: "Welcome to the chat" })

		socket.broadcast.to(user.room).emit("message", {
			user: "admin",
			text: `${user.name} has joined the chat`
		})

		io.emit("usersInRoom", {
			room: user.room,
			users: getUsersInRoom(user.room)
		})
		socket.join(user.room)
	})

	socket.on("sendMessage", ({ message, name }) => {
		const user = getUser(name)

		io.to(user.room).emit("message", { user: user.name, text: message })
	})

	socket.on("disconnect", () => {
		const user = removeUser(socket.id)

		if (user) {
			io.emit("message", {
				user: "admin",
				text: `${user.name} has left the chat`
			})
		}

		io.emit("usersInRoom", {
			room: user.room,
			users: getUsersInRoom(user.room)
		})
	})
})

mongoose.connect(
	URI,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	},
	err => {
		if (err) {
			console.log(err)
		}
	}
)

app.listen(5500, () => {
	console.log(`Server is up and running for login and signup 5500`)
})
// server.listen(PORT, () => {
// 	console.log(`Listening on port ${PORT}`)
// })
