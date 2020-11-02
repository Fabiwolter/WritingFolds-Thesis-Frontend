import { useState, useEffect } from 'react'
import { getCookie, updateUser } from '../../actions/authAction'
import { getProfile, updateProfile } from '../../actions/userAction'
import { API } from '../../config'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'

const ProfileUpdate = () => {
	const [values, setValues] = useState({
		username: '',
		username_for_photo: '',
		name: '',
		email: '',
		about: '',
		password: '',
		error: false,
		success: false,
		loading: false,
		photo: '',
		userData: process.browser && new FormData()
	})

	const token = getCookie('token')
	const {username, username_for_photo, name, email, about, password, error, success, loading, photo, userData} = values

	const init = () => {
		getProfile(token).then(data => {
			if (data.error) {
				setValues({...values, error: data.error})
			} else {
				setValues({
					...values,
					username: data.username,
					username_for_photo: data.username,
					name: data.name,
					email: data.email,
					about: data.about
				})
			}
		})
	}

	useEffect(() => {
		init()
		setValues({ ...values, userData: new FormData() })
	}, [])


	const handleChange = name => e => {
		const value = name === 'photo' ? e.target.files[0] : e.target.value
		userData.set(name, value)
		setValues({ ...values, [name]: value, userData, error: false, success: false })
	}

	const handleSubmit = e => {
		e.preventDefault()
		setValues({...values, loading: true})
		updateProfile(token, userData).then(data => {
			if (data.error) {
				setValues({...values, error: data.error, success: false, loading: false})
			} else {
				updateUser(data, () => {
					setValues({
						...values,
						username: data.username,
						name: data.name,
						email: data.email,
						about: data.about,
						success: true,
						loading: false
					})
				})
			}
		})
	}

	const profileUpdateForm = () => (
		<Form onSubmit={handleSubmit}>
			<FormGroup>
				<Label className="text-muted">Profile Photo</Label>
				<Input onChange={handleChange('photo')} type="file" className="form-control input" accept="image/*" />
			</FormGroup>
			<FormGroup>
				<Label className="text-muted">Username</Label>
				<Input onChange={handleChange('username')} type="text" value={username} className="input-block"/>
			</FormGroup>
			<FormGroup>
				<Label className="text-muted">Name</Label>
				<Input onChange={handleChange('name')} type="text" value={name} className="input-block"/>
			</FormGroup>
			<FormGroup>
				<Label className="text-muted">About</Label>
				<Input onChange={handleChange('about')} type="textarea" value={about} className="input-block" rows="3"/>
			</FormGroup>
			<FormGroup>
				<Label className="text-muted">Password</Label>
				<Input onChange={handleChange('password')} type="password" value={password} className="input-block"/>
			</FormGroup>

			<Button type="submit" color="primary">Update</Button>
		</Form>
	)

	const showError = () => (
		<div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
			{error}
		</div>
	)
	const showSuccess = () => (
		<div className="alert alert-success" style={{display: success ? '' : 'none'}}>
			Profile updated
		</div>
	)
	const showLoading = () => (
		<div className="alert alert-info" style={{display: loading ? '' : 'none'}}>
			Loading...
		</div>
	)

	return (
		<React.Fragment>
			<div className="col md-4">
				{username_for_photo &&
					<img
						src={`${API}/user/photo/${username_for_photo}`}
						className=""
						style={{ maxHeight: 'auto', maxWidth: '100%' }}
						alt="user profile"
					/>
				}
			</div>
			<div className="col md-8 mb-5">
				{showSuccess()}
				{showError()}
				{showLoading()}
				{profileUpdateForm()}
			</div>
		</React.Fragment>
	)

}



export default ProfileUpdate