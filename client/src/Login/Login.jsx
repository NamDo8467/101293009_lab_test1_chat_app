import { useHistory } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
function Login() {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState("")
	const history = useHistory()
	const login = e => {
		e.preventDefault()
		if (username === "") {
			setError("Username not found")
			return
		}
		if (password === "") {
			setError("Password is incorrect")
			return
		}
		axios
			.post("http://localhost:5500/user/login", {
				username,
				password
			})
			.then(res => {
				localStorage.setItem("userid", res.data.userID)
				localStorage.setItem("username", res.data.username)
				history.push("/join", {name:username})
			})
			.catch(err => {
				setError(err.response.data.message)
			})
	}
	const navigateToSignUp = () => {
		history.push("/signup")
	}
	return (
		<div className='h-screen flex flex-col justify-center items-center'>
			<h1 className='font-bold text-3xl'>ChitChat</h1>
			<div className='flex flex-col justify-center gap-4 items-center h-1/3 w-1/3 '>
				{error ? <p className='italic'>{error}</p> : null}
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
				{/* {error ? <p className='italic'>{error}</p> : null} */}
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
