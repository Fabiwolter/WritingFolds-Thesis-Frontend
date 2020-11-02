import { useState } from 'react'
import { emailContactForm } from '../../actions/formAction'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'

const ContactForm = ({userEmail}) => {
	const [values, setValues] = useState({
		message: '',
		name: '',
		email: '',
		sent: false,
		buttonText: 'Send Message',
		success: false,
		error: false
	})

	const {message, name, email, sent, buttonText, success, error} = values

	const clickSubmit = (e) => {
		e.preventDefault()
		setValues({...values, buttonText: "sending..."})
		emailContactForm({ userEmail, name, email, message }).then(data => {
			if (data.error) {
				setValues({...values, error: data.error})
			} else {
				setValues({
					...values,
					sent: true,
					name: '',
					email: '',
					message: '',
					buttonText: 'Sent',
					success: data.success})
			}
		})
	}

	const handleChange = name => e => {
		setValues({
			...values,
			[name]: e.target.value,
			error: false,
			success: false,
			buttonText: 'Send Message'})
	}

	const showSuccessMessage = () => success && (
		<div className="alert alert-success">
			Thanks for contacting.
		</div>
	)
	const showErrorMessage = () => error && (
		<div className="alert alert-danger">
			{error}
		</div>
	)

	const contactForm = () => {
		return (
			<Form onSubmit={clickSubmit}>
				<FormGroup>
					<Label className="lead">Message</Label>
					<Input
						onChange={handleChange('message')}
						type="textarea"
						className="form-control input-block"
						rows="10"
						value={message}
						required
					/>
				</FormGroup>
				<FormGroup>
					<Label className="lead">Name</Label>
					<Input
						onChange={handleChange('name')}
						type="text"
						className="form-control input-block"
						value={name}
						required
					/>
				</FormGroup>
				<FormGroup>
					<Label className="lead">Email</Label>
					<Input
						onChange={handleChange('email')}
						type="email"
						className="form-control input-block"
						value={email}
						required
					/>
				</FormGroup>

				<Button type="submit" color="primary">{buttonText}</Button>
			</Form>
		)
	}

	return (
		<React.Fragment>
			<div className="row">
				<div className="col md-12 sm-12">
					{showSuccessMessage()}
					{showErrorMessage()}
					{contactForm()}
				</div>
			</div>

		</React.Fragment>
	)
}

export default ContactForm