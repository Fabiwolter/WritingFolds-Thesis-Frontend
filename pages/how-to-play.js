import Layout from '../components/Layout'

const Index = () => {
	return (
		<Layout>
			<div className="container">
				<div className="row">
					<article className="col md-12 article">
						<h2>Game Modes ?</h2>
						<p>Currently there are 3 "Game Modes" that you can Play. They are selectable when creating or editing your Story and will change the behaviour and look of it for every player. Also when browsing for Stories you will see a coloured Game-Mode-Tag on the Card of that Story.</p>
						<h3>Standard StoryWriting</h3>
						<p>Everything of the Story & added Parts will be visible to readers at all times.</p>
						<h3>Classic Folding Story</h3>
						<p>Only the Title, Prompt & the most recently added Part will be visible, until the Story is finished.</p>
						<h3>Writing Prompt</h3>
						<p>Inspired by the Subreddit <a href="https://www.reddit.com/r/WritingPrompts/" className="custom-link">r/WritingPrompts</a>. Based on your given prompt, every User has one chance to write his Story based on that.</p>
					</article>
				</div>
			</div>
		</Layout>
	)
}

export default Index;