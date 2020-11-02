import {useState, useEffect} from 'react'
import {getCookie} from '../../actions/authAction'
import {create, getTags, removeTag } from '../../actions/tagAction'

const TagAddRemove = () => {
	const [values, setValues] = useState({
		name:    '',
		error:   false,
		success: false,
		tags:    [],
		removed: false,
		reload:  false
	})

	const {name, error, success, tags, removed, reload} = values
	const token = getCookie('token')


	useEffect(() => {
		loadTags()
	}, [reload])


	const loadTags = () => {
		getTags().then(data => {
			if (data.error) {
				console.log(data.error)
			} else {
				setValues({...values, tags: data})
			}
		})
	}

	const showTags = () => {
		return tags.map((tag, index) => {
			return <button onDoubleClick={() => deleteConfirm(tag.slug)} title="Double click to delete" key={index} className="paper-btn margin-right-small margin-bottom-small">
				{tag.name}
			</button>
		})
	}

	const deleteConfirm = slug => {
		let answer = window.confirm('Are you sure you want to delete this tag?')
		if (answer) {
			deleteTag(slug)
		}
	}

	const deleteTag = slug => {
		removeTag(slug, token).then(data => {
			if (data.error) {
				console.log(data.error)
			} else {
				setValues({...values, error: false, success: false, name: '', removed: !removed, reload: !reload})
			}
		})
	}

	const clickSubmit = (e) => {
		e.preventDefault()
		create({name}, token).then(data => {
			if (data.error) {
				setValues({...values, error: data.error, success: false})
			} else {
				setValues({...values, error: false, success: true, name: '', reload: !reload})
			}
		})
	}
	const handleChange = (e) => {
		setValues({
			...values,
			name: e.target.value,
			error: false,
			success: false,
			removed: ''
		})
	}


	const showSuccess = () => {
		if(success) {
			return <div className="alert alert-success">Tag is created</div>
		}
	}
	const showError = () => {
		if(error) {
			return <div className="alert alert-danger">Tag already exists</div>
		}
	}
	const showRemoved = () => {
		if(removed) {
			return <div className="alert alert-danger">Tag is removed</div>
		}
	}

	const mouseMoveHandler = (event) => {
		setValues({...values, error: false, success: false, removed: ''})
	}


	const newTagForm = () => (
		<form onSubmit={clickSubmit}>
			<div className="row flex-middle">
				<div className="sm-8">
					<div className="form-group">
						<label className="text-muted">Tag</label>
						<input type="text" className="form-control input-block" onChange={handleChange} value={name} required/>
					</div>
				</div>
				<div className="sm-4">
					<div>
						<button type="submit" className="paper-btn btn-secondary margin">
							Create
						</button>
					</div>
				</div>
			</div>
		</form>
	)

	return <React.Fragment>
		{showSuccess()}
		{showError()}
		{showRemoved()}
		<div onMouseMove={mouseMoveHandler}>
			{newTagForm()}
			<br />
			<div className="row">
				{showTags()}
			</div>

		</div>
	</React.Fragment>
}

export default TagAddRemove