import { useState } from 'react'
import Layout from '../../../components/Layout'
import { forgotPassword } from '../../../actions/authAction'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'

const ForgotPassword = () => {
	const [values, setValues] = useState({
		email: '',
		message: '',
		error: '',
		showForm: true
	})

	const {email, message, error, showForm} = values

	const handleChange = name => (e) => {
		setValues({...values, message: '', error: '', [name]: e.target.value})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		setValues({...values, message: '', error: ''})
		forgotPassword({email}).then(data => {
			if (data.error) {
				setValues({...values, error: data.error})
			} else {
				setValues({...values, message: data.message, email: '', showForm: false})
			}
		})
	}

	const showError = () => (
		error ? <div className="alert alert-danger">{error}</div> : ''
	)
	const showMessage = () => (
		message ? <div className="alert alert-success">{message}</div> : ''
	)

	const passwordForgotForm = () => (
		<Form onSubmit={handleSubmit}>
			<FormGroup>
				<Input
					onChange={handleChange('email')}
					type="email"
					className="form-control input-block"
					value={email}
					placeholder="Type your email"
					required
				/>
			</FormGroup>
			<Button type="submit" color="secondary">request password-reset mail</Button>
		</Form>
	)

	return (
		<Layout>
			<div className="row margin-none">
				<div className="col md-12">
					<h2>Forgot Password</h2>

					<div className="col md-5">
						{showError()}
						{showMessage()}
						{showForm && passwordForgotForm()}
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default ForgotPassword