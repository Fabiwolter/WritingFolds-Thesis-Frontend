import Link from 'next/link'
import Layout from '../../components/Layout'
import {useState} from 'react'
import {listAllStoriesWithTags} from '../../actions/storyAction'
import Card from '../../components/story/Card'

const Stories = ({ stories, tags, totalStories, pagingLimit, pagingSkip, router }) => {

	const [limit, setLimit] = useState(pagingLimit)
	const [skip, setSkip] = useState(0)
	const [size, setSize] = useState(totalStories)
	const [loadedStories, setLoadedStories] = useState([])

	const loadMore = () => {
		let toSkip = skip + limit
		listAllStoriesWithTags(toSkip, limit).then(data => {
			if (data.error) {
				console.log(data.error)
			} else {
				setLoadedStories([...loadedStories, ...data.stories])
				setSize(data.size)
				setSkip(toSkip)
			}
		})
	}

	const loadMoreButton = () => {
		return (
			size > 0 && size >= limit && (
				<button onClick={loadMore} className="btn-block">
					Load more
				</button>
			)
		)
	}

	const showAllStories = () => {
		return stories.map((story, i) => {
			return <article key={i} className="lg-4 md-6 sm-6 col">
				<Card story={story} />
				<br/>
			</article>
		})
	}

	const showAllTags = () => {
		return tags.map((t, i) => {
			if (i) {
				 return <Link href={`/tags/${t.slug}`} key={i}>
					 <a className="horizontal-scroll-buttons paper-btn btn-small margin-right-small margin-bottom-small">{t.name}</a>
				 </Link>
			}
		})
	}

	const showLoadedStories = () => {
		return loadedStories.map((story, i) => {
			return <article key={i} className="lg-4 md-6 sm-6 col">
				<Card story={story} />
				<br />
			</article>
		})
	}

	return (
		<Layout>
			<main>
				<div className="container-fluid">
					<header>
						<div className="">
							<h2 className="text-center">Aaaaall the Stories</h2>
						</div>
						<div className="horizontal-scroll-wrapper">
							<section className="horizontal-scroll-section">
								{showAllTags()}
							</section>
						</div>

					</header>
				</div>
				<div className="container-fluid">
					<div className="row flex-spaces">
						{showAllStories()}
						{showLoadedStories()}
					</div>
				</div>
				<div className="text-center padding-bottom">
					{loadMoreButton()}
				</div>
			</main>
		</Layout>
	)
}

Stories.getInitialProps = () => {
	let skip = 0
	let limit = 18

	return listAllStoriesWithTags(skip, limit).then(data => {
		if (data.error) {
			console.log(data.error)
		} else {
			return {
				stories:      data.stories,
				tags:         data.tags,
				totalStories: data.size,
				pagingLimit:  limit,
				pagingSkip:   skip
			}
		}
	})
}

export default Stories