import Link from 'next/link'
import { useState, useEffect } from 'react'
import { getCookie, isAuthenticated } from '../../actions/authAction'
import { list, removeStory } from '../../actions/storyAction'
import moment from 'moment'
import { Button } from 'reactstrap'

const StoryRead = ({ username }) => {
	const [stories, setStories] = useState([])
	const [message, setMessage] = useState('')
	const token = getCookie('token')

	useEffect(() => {
		loadStories()
	}, [])

	const loadStories = () => {
		const token = getCookie('token')
		list(username, token).then(data => {
			if (data.error) {
				console.log(data.error)
			} else {
				setStories(data)
			}
		})
	}

	const deleteStory = (slug) => {
		removeStory(slug, token).then(data => {
			if (data.error) {
				console.log(data.error)
			} else {
				setMessage(data.message)
				loadStories()
			}
		})
	}

	const deleteConfirm = (slug) => {
		let answer = window.confirm('Are u sure u want to d3l3t3 le Story?')
		if (answer) {
			deleteStory(slug)
		}
	}

	const showUpdateButton = (story) => {
		if (isAuthenticated() && isAuthenticated().role === 0) {
			return (
				<Link href={`/user/crud/${story.slug}`}>
					<a className="paper-btn">Update</a>
				</Link>
			)
		} else if (isAuthenticated() && isAuthenticated().role === 1) {
			return (
				<Link href={`/admin/crud/${story.slug}`}>
					<a className="paper-btn btn-warning-outline">Update</a>
				</Link>
			)
		}
	}

	const showAllStories = () => {
		return stories.map((story, i) => {
			if (isAuthenticated() && isAuthenticated().role === 0) {
				return (
					<article key={i} className="col sm-12 padding-none margin-bottom">
						<div key={i} className="card ">
							<div className="card-body">
								<div>
									<Link href={`/stories/${story.slug}`}>
										<a className="text-primary">
											<header className="card-title">
												<h4>{story.title}</h4>
											</header>
											<section>
												<p className="article-meta">
													Published {moment(story.createdAt).fromNow()} |
													Updated {moment(story.updatedAt).fromNow()}
												</p>
											</section>
										</a>
									</Link>
								</div>
								<div>
									<section className="row flex-spaces margin-none">
										<Button className="btn btn-danger-outline"
												onClick={() => deleteConfirm(story.slug)}>
											Delete
										</Button>
										{showUpdateButton(story)}
									</section>
								</div>
							</div>
						</div>
					</article>
				)
			} else if (isAuthenticated() && isAuthenticated().role === 1) {
				return (
					<article key={i} className="col xl-4 lg-6 sm-12 padding-top-none padding-bottom-none padding-right-small padding-left-small margin-bottom">
						<div key={i} className="card ">
							<div className="card-body">
								<div>
									<Link href={`/stories/${story.slug}`}>
										<a className="text-primary">
											<header className="card-title">
												<h4>{story.title}</h4>
											</header>
											<section>
												<p className="article-meta">
													Published {moment(story.createdAt).fromNow()} by <Link href={`/profile/${story.postedBy.username}`}>
														<a className="custom-link">{story.postedBy.name}</a>
													</Link>  | Updated {moment(story.updatedAt).fromNow()}
												</p>
											</section>
										</a>
									</Link>
								</div>
								<div>
									<section className="row flex-spaces margin-none">
										<Button className="btn btn-danger-outline"
												onClick={() => deleteConfirm(story.slug)}>
											Delete
										</Button>
										{showUpdateButton(story)}
									</section>
								</div>
							</div>
						</div>
					</article>
				)
			}
		})
	}


	return (
		<React.Fragment>
			<div className="row">
				{message && <div className="alert alert-warning">{message}</div>}
				{showAllStories()}
			</div>
		</React.Fragment>
	)
}


export default StoryRead