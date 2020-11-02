import Layout from '../components/Layout'
import Link from 'next/link'

const Index = () => {
	return (
		<Layout>
			<div className="container">
				<div className="row">
					<article className="col md-12 article">
						<br/>
						<p className="text-lead">
							"When I was little, the teacher would make us sit around a table with a sheet of paper & a pen. We wrote, fold and laughed. I can still see my 10-year-old self getting excited about ‘folded story-time’."
						</p>


						<h2>What is a folding story?</h2>
						<img className="float-right" src="https://stressymummy.co.uk/wp-content/uploads/2015/03/who-what-how-when-where-why-game-.jpg" />

						<p>
							This is a kind of story that a small group or even your whole class can write together.
						</p>
						<p>
							A folding story begins with a prompt or introduction. You will usually read this to everyone. The prompt will give the parameters or an opening for the story that will be used as a launching point for their own contributions to the tale.
						</p>
						<p>
							The first person may write the first sentence or few sentences in the center of a piece of paper. That person should then fold the paper in half so that the writing cannot be seen. This now-folded paper will be passed on to the next member of the team; he or she will then write his own sentence or paragraph. When s/he finishes, they will fold the paper again before passing it on and so on and so forth.
						</p>
						{/*<br/>*/}
						<h4 className="padding-left-large  padding-right-large">
							WRITINGFOLDS is just like the game we played as children but now online with grown-ups from all over the internet
						</h4>
						<p>
							There are different ways, on how to play this game. In most cases, the writers will not read what the previous contributor has written. In an alternative approach, the next reader reads only a few words or one sentence of the previous entry. He or she will then add their own entry. Alternatively it is also not necessary to even hide any part of the story and openly write a story together.
						</p>
						<p>
							The finished product of a folding story is sometimes very silly because it has been written without a lot of understanding of what is happening along the way. On the other hand, everyone had the same starting point and a few clues as to what the previous writer added, so the product might be surprisingly coherent. In either case, it is a great way to experience writing as a creative, entertaining, and collaborative process.
						</p>

						<br/>
						<h3><Link href="/how-to-play"><a className="custom-link">GAME MODES!</a></Link></h3>
						<p>
							There are Game Modes! If you want to know more about them click <Link href="/how-to-play">
							<a className="custom-link">here</a>
							</Link> or above!
						</p>
						<br/>
						<br/>
						<br/>
						<br/>
						<hr/>
						<p className="disabled">
							This App is in development... so keep in mind that errors can occur and All of your data could get removed due to a Database-flush or -upgrade.
						</p>

					</article>
				</div>
			</div>
		</Layout>
	)
}

export default Index;