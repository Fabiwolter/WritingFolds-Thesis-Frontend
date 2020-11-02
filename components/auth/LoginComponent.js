import {useState, useEffect} from 'react'
import {signin, authenticate, isAuthenticated} from '../../actions/authAction'
import Router from 'next/router'
import Link from 'next/link'


const LoginComponent = () => {
	const [values, setValues] = useState({
		email: '',
		password: '',
		error: '',
		loading: false,
		message: '',
		showForm: true
	})

	useEffect(() => {
		isAuthenticated() && Router.push(`/`)
	}, [])

	const {email, password, error, loading, message, showForm} = values

	const handleSubmit = (e) => {
		e.preventDefault()
		setValues({
			...values,
			loading: true,
			error: false
		})
		const user = {email, password}

		signin(user).then(data => {
			if (data.error) {
				setValues({
					...values,
					error: data.error,
					loading: false
				})
			} else {
				authenticate(data, () => {
					if (isAuthenticated() && isAuthenticated().role === 1) {
						Router.push('/admin')
					} else {
						Router.push('/user')
					}
				})
			}
		})
	}

	const handleChange = name => e => {													// "curried function": https://stackoverflow.com/questions/32782922/what-do-multiple-arrow-functions-mean-in-javascript
		setValues({...values, error: false, [name]: e.target.value})
	}

	const showLoading = () => (loading ? <div className="alert alert-primary">Loading...</div> : '')
	const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '')
	const showMessage = () => (message ? <div className="alert alert-primary">{message}</div> : '')

	const loginForm = () => {
		return (
			<form onSubmit={handleSubmit}>

				<div className="form-group">
					<input value={email}
						   onChange={handleChange('email')}
						   type="email"
						   className="form-control input-block"
						   placeholder="Type your email"/>
				</div>

				<div className="form-group">
					<input value={password}
						   onChange={handleChange('password')}
						   type="password"
						   className="form-control input-block"
						   placeholder="Type your password"/>
				</div>

				<div>
					<button className="btn btn-primary">Login</button>

					<Link href="/auth/password/forgotPassword">
						<button className="btn-small paper-btn margin-left">Reset password</button>
					</Link>
				</div>
			</form>

		)
	}

	return <React.Fragment>
		{showError()}
		{showLoading()}
		{showMessage()}

		{showForm && loginForm()}
	</React.Fragment>
}

export default LoginComponent