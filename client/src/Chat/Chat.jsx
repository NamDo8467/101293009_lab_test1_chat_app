import React, { useState, useEffect, useRef } from "react"
import { io } from "socket.io-client"
import Messages from "../Messages/Messages"
import { useLocation, useHistory } from "react-router-dom"
import ChatRoomInfo from "../ChatRoomInfo/ChatRoomInfo"
import axios from "axios"
import "./Chat.css"

let socket
function Chat() {
	const [messages, setMessages] = useState([])
	const [message, setMessage] = useState("")

	const [userTyping, setUserTyping] = useState("")

	const focusRef = useRef()

	const [name, setName] = useState("")
	const [room, setRoom] = useState("")
	const [usersInRoom, setUsersInRoom] = useState([])

	const ENDPOINT = "http://localhost:5000"

	const location = useLocation()
	const history = useHistory()
	useEffect(() => {
		if (location.state?.room && location.state?.name) {
			axios
				.get(`http://localhost:5500/chat/get/${location.state.room}`)
				.then(response => {
					// console.log(response)
					setMessages(response.data)
				})
				.catch(error => {
					console.log(error)
				})
		} else {
			history.push("/")
		}
	}, [])

	useEffect(() => {
		if (location.state?.room && location.state?.name) {
			const room = location.state.room
			const name = location.state.name
			setName(name)
			setRoom(room)
			socket = io(ENDPOINT)
			socket.emit("joinRoom", { name: name, room: room })

			return () => {
				socket.disconnect()
				socket.off()
			}
		} else {
			history.push("/")
		}
	}, [ENDPOINT])

	useEffect(() => {
		if (location.state?.room && location.state?.name) {
			socket.on("message", message => {
				setMessages([...messages, message])
			})
			socket.on("usersInRoom", ({ room, users }) => {
				setUsersInRoom(users)
			})
		} else {
			history.push("/")
		}
	}, [messages])
	const sendMessage = async event => {
		event.preventDefault()
		if (message.trim() !== "") {
			try {
				const response = await axios.post("http://localhost:5500/chat/send", { from: name, room: room, message: message })
				if (response.data.message === "Message sent") {
					socket.emit("sendMessage", { message, name })
					setMessage(" ")
				}
			} catch (error) {
				console.log(error)
			}
		}
	}

	useEffect(() => {
		socket.on("typingIn", message => {
			if (message.text) {
				setUserTyping(message.text)
			}
		})
	}, [userTyping])

	useEffect(() => {
		socket.on("typingOut", message => {
			if (message.text === "No one") {
				alert(message.text)
				setUserTyping("")
			}
		})
	}, [userTyping])
	const logout = event => {
		history.push("/")
	}

	const handleFocusIn = () => {
		socket.emit("userTyping", { name, room })
	}

	const handleFocusOut = () => {
		socket.emit("userTypingOut", { room })
	}
	return (
		<div style={{ display: "flex", justifyContent: "space-around" }}>
			<div className='chatRoomInfo'>
				<ChatRoomInfo room={room} users={usersInRoom} />
				<button onClick={logout} className='p-2 hover:bg-red-600 bg-red-500 text-black font-semibold' type='submit'>
					Logout
				</button>
			</div>
			<div className='border border-black'></div>
			<div className='chatContainer'>
				<div className='chatMessages'>
					<Messages messages={messages} name={name} />
				</div>
				<div className='input'>
					<div className='flex flex-col'>
						<span className='italic'>{userTyping}</span>
						<div>
							<input
								ref={focusRef}
								value={message}
								type='text'
								onFocus={handleFocusIn}
								onBlur={handleFocusOut}
								onChange={e => setMessage(e.target.value)}
								onKeyPress={event => (event.key === "Enter" ? sendMessage(event) : null)}
							/>
							<button className='sendBtn bg-blue-600 hover:bg-blue-700' type='submit' onClick={sendMessage}>
								SEND
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Chat
