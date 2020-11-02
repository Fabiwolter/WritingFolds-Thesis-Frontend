import Link from 'next/link'
import Layout from '../../components/Layout'
import { useEffect, useState } from 'react'
import { singleStory, listRelated } from '../../actions/storyAction'
import { withRouter } from 'next/router'
import moment from 'moment'
import SmallCard from '../../components/story/SmallCard'
import PartAdd from '../../components/crud/PartAdd'
import PartsList from '../../components/crud/PartsList'
import GameModeTag from '../../components/story/GameModeTag'


const SingleStory = ({router, story}) => {

	const [related, setRelated] = useState([])
	const [limit, setLimit] = useState(3)

	const loadRelated = () => {
		listRelated(story, limit).then(data => {
			if (data.error) {
				console.log(data.error)
			} else {
				setRelated(data)
			}
		})
	}

	useEffect(() => {
		loadRelated()
	}, [])


	const showStoryTags = story => (
		story.tags.map((t, i) => (
			<Link key={i} href={`/tags/${t.slug}`}>
				<a className="paper-btn btn-small mr-1 ml-1">{t.name}</a>
			</Link>
		))
	)

	const showCollaborators = story => (
		story.collaborators.map((c, i) => {
			if (c !== null)
				return <Link key={i} href={`/profile/${c.username}`}>
					<a className="paper-btn btn-secondary-outline btn-small mr-1 ml-1">{c.name}</a>
				</Link>
		})
	)

	const showRelatedStories = () => {
		return related.map((story, i) => {
			return <div key={i} className="col sm-6 md-4">
				<article>
					<SmallCard story={story}/>
				</article>
			</div>
		})
	}

	const showStory = () => {
		return (
			<article className="article upper-story">
				<h2 className="article-title">{story.title} { story.is_finished && <span className="badge success ">finished</span> }</h2>
				<section>
					<p className="article-meta">
						Written by <Link href={`/profile/${story.postedBy.username}`}>
							<a>{story.postedBy.name}</a>
						</Link> | Published {moment(story.createdAt).fromNow()}
					</p>
				</section>
				<section>
					<p className="text-lead custom-text-lead">{story.body}</p>
				</section>
			</article>
		)
	}

	return <React.Fragment>
		<Layout>
			<main>
				<div className="container" style={{width: '100%'}}>
					<div className="row">
						<div className="col sm-12">
							{showStory()}
							<article className="article">
								<PartsList/>
							</article>

							<PartAdd />
						</div>
					</div>
				</div>


				<div className="row">
					<div className="col">
						<section>
							<GameModeTag game_mode={story.game_mode} />
							{showStoryTags(story)}
						</section>
					</div>
				</div>
				{
					story.collaborators.length > 0 && story.collaborators[0] !== null &&
					<div className="row">
						<div className="col">
							<section>
								<h4>Collaborators to this Story:</h4>
								{showCollaborators(story)}
							</section>
						</div>
					</div>
				}
				<div className="row">
					<div className="col sm-12">
						<h4>related Stories...</h4>
					</div>
					{showRelatedStories()}
				</div>
			</main>
		</Layout>
	</React.Fragment>
}

SingleStory.getInitialProps = ({query}) => {
	return singleStory(query.slug).then(data => {
		if (data.error) {
			console.log(data.error)
		} else {
			return {story: data.story, query}
		}
	})
}


export default withRouter(SingleStory)