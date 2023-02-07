import React, { useState } from "react"
import { useHistory, useLocation } from "react-router-dom"
import "./Join.css"

function Join() {
	const [room, setRoom] = useState("Javascript")

	let history = useHistory()
	const location = useLocation()
	// console.log(location.state.name)
	const handleJoin = e => {
		if (!room) {
			e.preventDefault()
		} else {
			history.push(`/chat`, { name: location.state.name, room })
		}
	}
	return (
		<form>
			<div className='greeting m-2'>
				<h1 className='font-bold text-2xl'>Welcome to ChitChat</h1>
			</div>
			<div className='roomInput mb-3'>
				<select name='room' id='room' onChange={e => setRoom(e.target.value)}>
					<option value='Javascript'>Javascript</option>
					<option value='Python'>Python</option>
					<option value='Ruby'>Ruby</option>
				</select>
			</div>
			<button className='button' type='submit' onClick={handleJoin}>
				JOIN
			</button>
		</form>
	)
}

export default Join
