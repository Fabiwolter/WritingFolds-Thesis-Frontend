import Link from 'next/link'
import Layout from '../../components/Layout'
import Card from '../../components/story/Card'
import {getSingleGameMode} from "../../actions/gameModeAction";
import {gameModeNumberToString} from "../../helperMethods/gameModeHelper";


const GameMode = ({ gameMode, stories, query }) => {

	const showAllStories = () => {
		return stories.map((story, i) => {
			return <article key={i} className="lg-4 md-6 col">
				<Card story={story} />
				<br/>
			</article>
		})
	}

	const showGameModeTag = gameMode => (
		gameMode === 1 &&
			<Link href="/how-to-play">
				<h3 className="text-center paper-btn btn-secondary-outline btn-large">{gameModeNumberToString(gameMode)}</h3>
			</Link>
		|| gameMode === 2 &&
			<Link href="/how-to-play">
				<h3 className="text-center paper-btn btn-success-outline btn-large">{gameModeNumberToString(gameMode)}</h3>
			</Link>
	)

	return (
		<React.Fragment>
			<Layout>
				<main>
					<div className="row flex-center">
						<header>
							<div className="col md-12">
								{showGameModeTag(gameMode)}
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

GameMode.getInitialProps = ({query}) => {
	return getSingleGameMode(query.slug).then(data => {
		if (data.error) {
			console.log(data.error)
		} else {
			return {
				gameMode : Number(query.slug),
				stories: data.stories,
				query }
		}
	})
}


export default GameMode

