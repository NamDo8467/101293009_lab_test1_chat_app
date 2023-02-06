import { useState } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"
function Signup() {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [firstname, setFirstname] = useState("")
	const [lastname, setLastname] = useState("")
	const history = useHistory()

	const navigateToLogin = () => {
		history.push("/login")
	}

	const signUp = async () => {
		console.log("dsfhdsf")
		if (username.trim() === "") {
			console.log("Username cannot be empty")
			return
		}
		try {
			const response = await axios.post("http://localhost:5500/user/register", {
				firstname,
				lastname,
				username: username.trim(),
				password
			})

			history.push("/")
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<div className='h-screen flex flex-col justify-center items-center'>
			<div className='flex flex-col justify-center gap-4 items-center h-1/3 w-1/3 '>
				<h1 className='font-bold text-3xl'>ChitChat</h1>
				<input
					value={firstname}
					onChange={e => {
						setFirstname(e.target.value)
					}}
					type='text'
					placeholder='First name'
					required={true}
					className='p-2 focus:outline-none'
				/>
				<input
					value={lastname}
					onChange={e => {
						setLastname(e.target.value)
					}}
					type='text'
					placeholder='Last name'
					required={true}
					className='p-2 focus:outline-none'
				/>
				<input
					value={username}
					onChange={e => {
						setUsername(e.target.value)
					}}
					type='text'
					placeholder='Username'
					required={true}
					className='p-2 focus:outline-none'
				/>
				<input
					value={password}
					onChange={e => {
						setPassword(e.target.value)
					}}
					type='password'
					placeholder='Password'
					required={true}
					className='p-2 focus:outline-none'
				/>

				<div className='flex gap-3'>
					<button type='submit' className='p-3 bg-blue-300 rounded-2xl hover:bg-blue-400' onClick={navigateToLogin}>
						Login
					</button>
					<button type='submit' className='p-3 bg-red-300 rounded-2xl hover:bg-red-400' onClick={signUp}>
						Sign up
					</button>
				</div>
			</div>
		</div>
	)
}
export default Signup
