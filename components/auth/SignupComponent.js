import { useEffect, useState } from 'react'
import { isAuthenticated, signup } from '../../actions/authAction'
import Router from 'next/router'
import Link from 'next/link'


const SignupComponent = () => {
	const [values, setValues] = useState({
		name: '',
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

	const {name, email, password, error, loading, message, showForm} = values

	const handleSubmit = (e) => {
		e.preventDefault()
		setValues({
			...values,
			loading: true,
			error: false
		})
		const user = {name, email, password}

		signup(user).then(data => {
			if (data.error) {
				setValues({
					...values,
					error: data.error,
					loading: false
				})
			} else {
				setValues({
					...values,
					name:'',
					email: '',
					password: '',
					error: false,
					loading: false,
					message: data.message,
					showForm: false
				})
			}
		})
	}

	const handleChange = name => e => {
		setValues({...values, error: false, [name]: e.target.value})
	}

	const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '')
	const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '')
	const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : '')

	const signupForm = () => {
		return (
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<input value={name}
						   onChange={handleChange('name')}
						   type="text"
						   className="form-control input-block"
						   placeholder="Type your name"/>
				</div>

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
					<button className="btn btn-primary">Signup</button>
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

		{showForm && signupForm()}
	</React.Fragment>
}

export default SignupComponent