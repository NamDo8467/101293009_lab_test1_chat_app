import React, { useState, useEffect } from "react"
import { io } from "socket.io-client"
import Messages from "../Messages/Messages"
import { useLocation } from "react-router-dom"
import ChatRoomInfo from "../ChatRoomInfo/ChatRoomInfo"

import "./Chat.css"

let socket
function Chat() {
	const [messages, setMessages] = useState([])
	const [message, setMessage] = useState("")

	const [name, setName] = useState("")
	const [room, setRoom] = useState("")
	const [usersInRoom, setUsersInRoom] = useState([])

	const ENDPOINT = "http://localhost:5000"

	const location = useLocation()

	useEffect(() => {
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
	}, [ENDPOINT])

	useEffect(() => {
    socket.on("message", message => {
			setMessages([...messages, message])
		})
		socket.on("usersInRoom", ({ room, users }) => {
			setUsersInRoom(users)
		})
	}, [messages])
	const sendMessage = event => {
		event.preventDefault()
		if (message) {
			socket.emit("sendMessage", { message, name })
			setMessage(" ")
		}
	}
	return (
		<div style={{ display: "flex", justifyContent: "space-around" }}>
			<div className='chatRoomInfo'>
				<ChatRoomInfo room={room} users={usersInRoom} />
			</div>
			<div className='chatContainer'>
				<div className='chatMessages'>
					<Messages messages={messages} name={name} />
				</div>
				<div className='input'>
					<input
						value={message}
						type='text'
						onChange={e => setMessage(e.target.value)}
						onKeyPress={event => (event.key === "Enter" ? sendMessage(event) : null)}
					/>
					<button className='sendBtn' type='submit' onClick={sendMessage}>
						SEND
					</button>
				</div>
			</div>
		</div>
	)
}

export default Chat
