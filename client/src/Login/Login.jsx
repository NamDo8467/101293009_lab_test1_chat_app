import { useHistory } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
function Login() {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const history = useHistory()
	const login = e => {
		e.preventDefault()
		axios
			.post("http://localhost:5500/user/login", {
				username,
				password
			})
			.then(res => {
				localStorage.setItem("userid", res.data.userID)
				history.push("/join")
			})
			.catch(err => {
				console.error(err)
			})
	}
	const navigateToSignUp = () => {
		history.push("/signup")
	}
	return (
		<div className='h-screen flex flex-col justify-center items-center'>
			<h1 className='font-bold text-3xl'>ChitChat</h1>
			<div className='flex flex-col justify-center gap-4 items-center h-1/3 w-1/3 '>
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
					<button type='submit' className='p-3 bg-blue-300 rounded-2xl hover:bg-blue-400' onClick={login}>
						Login
					</button>
					<button type='submit' className='p-3 bg-red-300 rounded-2xl hover:bg-red-400' onClick={navigateToSignUp}>
						Sign up
					</button>
				</div>
			</div>
		</div>
	)
}
export default Login
