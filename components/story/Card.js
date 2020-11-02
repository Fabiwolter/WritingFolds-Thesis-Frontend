import Link from 'next/link'
import moment from 'moment'
import GameModeTag from './GameModeTag'


const Card = ({story}) => {

	const showStoryTags = story => (
		story.tags.map((t, i) => (
			<Link key={i} href={`/tags/${t.slug}`}>
				<a className="paper-btn btn-small mr-1 ml-1">{t.name}</a>
			</Link>
		))
	)

	return (
		<div className="card">
			<div className="card-body">
				<Link href={`/stories/${story.slug}`}>
					<a className="text-primary">
						{ story.is_finished && <span className="badge success finished-card-badge">finished</span> }
						{ story.tags.find(tag => tag.name === 'dev-Update') && <span className="badge danger dev-update-card-badge">dev Update</span> }
						<header className="card-title">
							<h4>{story.title}</h4>
						</header>
						<section>
							<p className="article-meta">
								Written by <Link href={`/profile/${story.postedBy.username}`}>
									<a>{story.postedBy.name}</a>
								</Link> | Published {moment(story.createdAt).fromNow()}
							</p>
						</section>
						<div>
							<section>
								<p className="card-text">
									{story.excerpt}
								</p>
							</section>
						</div>
					</a>
				</Link>
			</div>

			<div className="card-footer">
				<section>
					<GameModeTag game_mode={story.game_mode} />
					{showStoryTags(story)}
				</section>
			</div>
		</div>
	)
}


export default Card