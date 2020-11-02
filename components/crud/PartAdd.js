import {useState, useEffect} from 'react'
import {withRouter} from 'next/router'									// allows us to use Router, its parameters and props
import {getCookie, isAuthenticated} from '../../actions/authAction'
import { createPart } from '../../actions/partAction'
import { Button, Form, FormGroup, Input } from 'reactstrap'
import { updateStoryParts } from '../../actions/storyAction'
import { useStory } from '../../dataHooks/storyHooks'
import { mutate } from 'swr'
import {checkIfUsernameIsInArrayOfUsers} from '../../helperMethods/friendHelper'


const PartAdd = ({router}) => {
	const {story, friends, isLoading, isError} = useStory(router.query.slug)

	const [values, setValues] = useState({
		createError: '',
		success: '',
		formData: '',
		body: ''
	})

	const {success, formData, body, createError} = values
	const token = getCookie('token')

	useEffect(() => {
		setValues({...values, formData: new FormData()})
	}, [router])


	const checkIfAllowedToEdit = (e) => {
		if (story && isAuthenticated() && !story.is_finished) {
			if (story.collab_privacy === 0 && friends) {
				if (checkIfUsernameIsInArrayOfUsers(isAuthenticated().username, friends)) {
					return true
				}
				if (story.postedBy.username === isAuthenticated().username) {
					return true
				}
				return false
			}
			return true
		}
	}

	const checkIfWritingPromptAndHasNotAdded = (e) => {
		if (story.game_mode === 2) {
			if (checkIfUsernameIsInArrayOfUsers(isAuthenticated().username, story.collaborators)) {
				return false
			}
			return true
		} else {
			return true
		}
	}

	const isAllowedToEdit = story && checkIfAllowedToEdit() && checkIfWritingPromptAndHasNotAdded()


	const handleChange = name => e => {
		const value = e.target.value
		formData.set(name, value)
		setValues({...values, [name]: value, formData: formData, createError: ''})
	}

	const showError = () => (
		<div className="alert alert-danger margin-top" style={{display: isError ? '' : 'none'}}>
			{isError}
		</div>
	)
	const showCreateError = () => (
		<div className="alert alert-danger margin-top" style={{display: createError ? '' : 'none'}}>
			{createError}
		</div>
	)
	const showSuccess = () => (
		<div className="alert alert-success margin-top" style={{display: success ? '' : 'none'}}>
			{success}
		</div>
	)

	const addPartAndUpdateStory = (e) => {
		e.preventDefault()
		createPart(formData, token).then(data => {
			if (data.error) {
				setValues({...values, createError: data.error})
			} else {
				setValues({...values, body: '', createError: '', success: `A new Part with slug "${data.slug}" is created.`})

				let parts = story.parts
				parts.push(data._id)
				let part = data._id

				updateStoryParts(story.slug, {part}, token).then(data => {
					if (data.error) {
						setValues({...values, createError: data.error})
					} else {
						setValues({...values, body: '', story: data, createError: '', success: `Your contribution to this Story has been added!`})
						mutate(`${story.slug}`).then(r => console.log(r))
					}
				})
			}
		})

	}

	const writePartForm = () => {
		if (isError) {
			return showError()
		}
		if (story) {
			return (
				<Form onSubmit={addPartAndUpdateStory}>
					<FormGroup>
						<Input type="textarea" value={body} className="input-block" placeholder="do your part..." onChange={handleChange('body')} rows="6"/>
					</FormGroup>
					<Button type="submit" color="primary">Add</Button>
				</Form>
			)
		}
	}
	if (story && isAllowedToEdit) {
		return (
			<div className="container-fluid">
				<div className="row flex-center">
					<div className="col sm-12 padding-none">
						{writePartForm()}
						{showCreateError()}
						{showSuccess()}
					</div>
				</div>
			</div>
		)
	} else {
		return (
			<div></div>
		)
	}
}


export default withRouter(PartAdd)