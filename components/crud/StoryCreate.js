import {useState, useEffect} from 'react'
import {withRouter} from 'next/router'
import {getCookie, isAuthenticated} from '../../actions/authAction'
import {getTags} from '../../actions/tagAction'
import {createStory} from '../../actions/storyAction'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import {gameModeNumberToString} from "../../helperMethods/gameModeHelper";


const CreateStory = ({router}) => {
	const storyFromLocalStorage = () => {
		if (typeof window === 'undefined') {
			return false
		}

		if (localStorage.getItem('story')) {
			return JSON.parse(localStorage.getItem('story'))
		} else return ''
	}

	const [tags, setTags] = useState([])
	const [checkedTag, setCheckedTag] = useState([])

	const [body, setBody] = useState(storyFromLocalStorage())
	const [values, setValues] = useState({
		error: '',
		loading: false,
		sizeError: '',
		success: '',
		formData: '',
		title: '',
		hidePublishButton: false,
		view_privacy: undefined,
		collab_privacy: undefined,
		is_finished: undefined,
		game_mode: 0
	})

	const {error, sizeError, success, formData, title, hidePublishButton, view_privacy, collab_privacy, is_finished, loading, game_mode} = values

	const token = getCookie('token')

	useEffect(() => {
		initFormData()
		initTags()
	}, [router])

	const initFormData = () => {
		setValues({...values, view_privacy: 1, is_finished: false, collab_privacy: 1, formData: new FormData()})
	}

	const initTags = () => {
		getTags().then(data => {
			if (data.error) {
				setValues({...values, error: data.error})
			} else {
				setTags(data)
			}
		})
	}


	const publishStory = (e) => {

		e.preventDefault()
		formData.set('view_privacy', view_privacy)
		formData.set('collab_privacy', collab_privacy)
		formData.set('is_finished', is_finished)
		formData.set('game_mode', game_mode)


		setValues({...values, loading: true})
		createStory(formData, token).then(data => {
			if (data.error) {
				setValues({...values, error: data.error, loading: false})
			} else {
				setValues({...values, title: '', error: '', loading: false, success: `A new blog titled "${data.title}" is created`})
				setBody('')
				setTags([])
				initTags()
			}
		})
	}


	const handleChange = name => e => {
		const value = e.target.value
		formData.set(name, value)
		setValues({...values, [name]: value, formData: formData, error: ''})
	}

	const handleNumberChange = name => e => {
		const value = parseInt(e.target.value, 10)
		formData.set(name, value)
		setValues({...values, [name]: value, formData: formData, error: ''})
	}

	const handleBody = (e) => {
		setBody(e.target.value)
		formData.set('body', e.target.value)
		if (typeof window !== 'undefined') {
			localStorage.setItem('story', JSON.stringify(e.target.value))
		}
	}

	const handleToggle = (t) => () => {
		setValues({...values, error: ''})
		const clickedTag = checkedTag.indexOf(t)
		const all = [...checkedTag]

		if (clickedTag === -1) {
			all.push(t)
		} else {
			all.splice(clickedTag, 1)
		}
		setCheckedTag(all)
		formData.set('tags', all)
	}

	const handleVisibilityToggle = (e) => {
		const invertedPrivacy = view_privacy ? 0 : 1
		formData.set('view_privacy', invertedPrivacy)
		setValues({...values, view_privacy: invertedPrivacy, formData: formData})
	}
	const handleEditabilityToggle = (e) => {
		const invertedPrivacy = collab_privacy ? 0 : 1
		setValues({...values, collab_privacy: invertedPrivacy})
		formData.set('collab_privacy', invertedPrivacy)
	}
	const handleFinishedToggle = (e) => {
		const invertedFinished = !is_finished
		setValues({...values, is_finished: invertedFinished})
		formData.set('is_finished', invertedFinished)
	}


	const showTags = () => {
		return (
			tags && tags.map((t, i) => (
				<label key={i} className="paper-check">
					<input
						onChange={handleToggle(t._id)}
						type="checkbox"
					/>
					<span>{t.name}</span>
				</label>
			))
		)
	}

	const showError = () => (
		<div className="padding-top padding-bottom" style={{display: error ? '' : 'none'}}>
			<div className="alert alert-danger">
				{error}
			</div>
		</div>
	)
	const showSuccess = () => (
		<div className="padding-top padding-bottom" style={{display: success ? '' : 'none'}}>
			<div className="alert alert-success">
				{success}
			</div>
		</div>
	)
	const showLoading = () => (
		<div className="padding-top padding-bottom" style={{display: loading ? '' : 'none'}}>
			<div className="alert alert-primary">
				loading...
			</div>
		</div>
	)


	const createStoryForm = () => {
		return (
			<Form onSubmit={publishStory}>
				<FormGroup>
					<Label className="text-muted">Title</Label>
					<Input type="text" value={title} className="form-control input-block" onChange={handleChange('title')} />
				</FormGroup>
				<FormGroup>
					<Label className="text-muted">Prompt</Label>
					<Input type="textarea" value={body} className="input-block" placeholder="write something..." onChange={handleBody} rows="6"/>
				</FormGroup>
				<Button type="submit" color="primary">Create</Button>
			</Form>
		)
	}

	const showVisibilityToggle = () => {
		return (
			<Label htmlFor="paperSwitch3" className="paper-switch-tile">
				<Input defaultChecked={view_privacy} onChange={handleVisibilityToggle} id="paperSwitch3" name="paperSwitch3" type="checkbox"/>
				<div className="paper-switch-tile-card border">
					<div className="paper-switch-tile-card-front border background-danger">Private</div>
					<div className="paper-switch-tile-card-back border background-success">Public</div>
				</div>
			</Label>
		)
	}
	const showEditabilityToggle = () => {
		return (
			<Label htmlFor="paperSwitch4" className="paper-switch-tile">
				<Input defaultChecked={collab_privacy} onChange={handleEditabilityToggle} id="paperSwitch4" name="paperSwitch4" type="checkbox"/>
				<div className="paper-switch-tile-card border">
					<div className="paper-switch-tile-card-front border background-warning">Friends</div>
					<div className="paper-switch-tile-card-back border background-success">Everyone</div>
				</div>
			</Label>
		)
	}
	const storyFinishedToggle = () => {
		return (
			<fieldset className="form-group margin-top">
				<Label className="paper-switch-2">
					<Input id="paperSwitch8" name="paperSwitch8" type="checkbox" defaultChecked={is_finished} onChange={handleFinishedToggle}/>
					<span className="paper-switch-slider"></span>
				</Label>
				<Label htmlFor="paperSwitch8" className="paper-switch-2-label">
					FINISH + LOCK STORY
				</Label>
			</fieldset>
		)
	}

	const showGameModeSelector = () => {
		return (
			<React.Fragment>
				<div className="form-group sm-12 md-5 lg-4">
					<label htmlFor="paperSelects1"></label>
					<select id="paperSelects1" value={game_mode} onChange={handleNumberChange('game_mode')}>
						<option value={0}>{gameModeNumberToString(0)}</option>
						<option value={1}>{gameModeNumberToString(1)}</option>
						<option value={2}>{gameModeNumberToString(2)}</option>
					</select>
				</div>
				<div className=" sm-12 md-7 lg-8">
					{game_mode === 0 &&
					<p className="disabled">
						Everything of the Story & added Parts will be visible to readers at all times.
					</p>
					}
					{game_mode === 1 &&
					<p className="disabled">
						Only the Title, Prompt & the most recently added Part will be visible, until the Story is finished.
					</p>
					}
					{game_mode === 2 &&
					<p className="disabled">
						Inspired by the Subreddit r/WritingPrompts. Based on your given prompt, every User has one chance to write his Story based on that.
					</p>
					}
				</div>
			</React.Fragment>
		)
	}


	return (
		<div className="container-fluid">
			<div className="row flex-right">
				<div className="col md-8 sm-12">
					{createStoryForm()}

					{showError()}
					{showSuccess()}
					{showLoading()}
				</div>

				<div className="col sm-6 md-4 padding-top-none">
					<h4>Tags</h4>
					<div style={{maxHeight: '300px', overflowY: 'scroll'}} className="padding-small border-dashed border-3">
						<fieldset className="form-group">
							{showTags()}
						</fieldset>
					</div>
				</div>

				<div className="col md-8 sm-6 padding-top-none">
					<h4>Game Mode</h4>
					<div className="row flex-middle padding-small border-dashed border-4">
						{showGameModeSelector()}
					</div>
				</div>

				<div className="col sm-6 md-4 padding-top-none">
					<h4>Privacy</h4>
					<div className="row padding-small border-dashed border-2">
						<div className="">
							<fieldset className="form-group margin-bottom-none">
								<p className="margin-top-none">Visibility</p>
								{ view_privacy !== undefined && showVisibilityToggle() }
							</fieldset>
						</div>
						<div className="">
							<fieldset className="form-group margin-bottom-none">
								<p className="margin-top-none">Editable by</p>
								{ collab_privacy !== undefined && showEditabilityToggle() }
							</fieldset>
						</div>
					</div>
				</div>

				<div className="col sm-6 md-4 padding-top-none">
					<h4>Story Settings</h4>
					<div className="row padding-small border-dashed border-1">
						{is_finished !== undefined && storyFinishedToggle()}
						<p className="disabled">Your Story will be marked as "finished", and no User will be able to add content to it anymore.</p>
						<p className="disabled">Also if it's a Folding Story, the Parts will become unfolded for everyone to read!</p>
					</div>
				</div>
			</div>
		</div>
	)
}


export default withRouter(CreateStory)