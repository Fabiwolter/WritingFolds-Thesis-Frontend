import Layout from '../../components/Layout'
import { getSingleTag } from '../../actions/tagAction'
import Card from '../../components/story/Card'


const Tag = ({ tag, stories, query }) => {
	const showAllStories = () => {
		return stories.map((story, i) => {
			return <article key={i} className="lg-4 md-6 col">
				<Card story={story} />
				<br/>
			</article>
		})
	}

	return (
		<React.Fragment>
			<Layout>
				<main>
					<div className="row flex-center">
						<header>
							<div className="col md-12">
								<h3 className="text-center  paper-btn btn-large">{tag.name}</h3>
							</div>
						</header>
					</div>
					<div className="row flex-spaces">
						{showAllStories()}
					</div>

				</main>
			</Layout>
		</React.Fragment>
	)
}

Tag.getInitialProps = ({query}) => {
	return getSingleTag(query.slug).then(data => {
		if (data.error) {
			console.log(data.error)
		} else {
			return {
				tag: data.tag,
				stories: data.stories,
				query }
		}
	})
}


export default Tag

