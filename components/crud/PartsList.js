import { useStory } from '../../dataHooks/storyHooks'
import withRouter from 'next/dist/client/with-router'
import {useState} from 'react'
import Link from 'next/link'
import {getCookie, isAuthenticated} from '../../actions/authAction'
import {removePart} from '../../actions/partAction'
import {mutate} from 'swr'
import StoryPartClassic from '../story/StoryPartClassic'
import StoryPartFoldingStory from '../story/StoryPartFoldingStory'
import StoryPartWritingPrompt from '../story/StoryPartWritingPrompt'


const PartsList = ({router}) => {
	const {story, isLoading, error} = useStory(router.query.slug)
	const username = story && story.postedBy.username
	const [values, setValues] = useState({
		removed: false
	})
	const {removed} = values
	const token = getCookie('token')



	const deleteConfirm = slug => {
		let answer = window.confirm('Are you sure you want to delete this Part?')
		if (answer) {
			deletePart(slug)
		}
	}

	const deletePart = slug => {
		removePart(slug, token).then(data => {
			if (data.error) {
				console.log(data.error)
			} else {
				mutate(`${story.slug}`).then(r => console.log(r))
				setValues({...values, removed: !removed})
			}
		})
	}

	const deletePartButton = (part) => (
		isAuthenticated() && isAuthenticated().role === 1 && (
			<button onClick={() => deleteConfirm(part.slug)} className="btn-small btn-danger">
				Delete
			</button>
		)
	)

	const showParts = () => {
		if (story) {
			if (story.game_mode === 0 || (story.is_finished === true && story.game_mode === 1)) {
				return story.parts.map((part, i) => {
					return (
						<StoryPartClassic part={part} deletePartButton={deletePartButton} iterator={i} key={i} />
					)
				})
			} if (story.game_mode === 1) {
				let partsLength = story.parts.length
				return story.parts.map((part, i) =>  {
					if (i === partsLength-1) {
						return (
							<StoryPartFoldingStory
								part={part}
								deletePartButton={deletePartButton}
								iterator={i}
								partsLength={partsLength}
								key={i} />
						)
					}
				})
			} else if (story.game_mode === 2) {
				return story.parts.map((part, i) => {
					return (
						<StoryPartWritingPrompt part={part} deletePartButton={deletePartButton} key={i} />
					)
				})
			}

		}
		if (isLoading) {
			return <p>is Loading...</p>
		} else if (error) {
			return <p>there is an error</p>
		} else {
			return <p>nope</p>
		}
	}

	const showRemoved = () => {
		if(removed) {
			return <div className="alert alert-danger">Part is removed</div>
		}
	}

	const mouseMoveHandler = (event) => {
		setValues({...values, error: false, success: false, removed: ''})
	}

	const showUpdateButton = () => {
		if (isAuthenticated() && isAuthenticated().username === username) {
			return (
				<div className="row flex-right">
					<div className="margin-right">
						<Link href={`/user/crud/${story.slug}`}>
							<button className="btn btn-warning-outline">
								edit Story
							</button>
						</Link>
					</div>
				</div>
			)
		}
	}


	return (
		<React.Fragment>
			<div onMouseMove={mouseMoveHandler} className="row">
				<div className="col sm-12 padding-left-none padding-right-none">
					{showParts()}
				</div>
			</div>
			{showRemoved()}
			{showUpdateButton()}

		</React.Fragment>


	)
}

export default withRouter(PartsList)