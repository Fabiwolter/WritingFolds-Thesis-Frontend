import Link from 'next/link'
import moment from 'moment'


const SmallCard = ({story}) => {
	return (
		<div className="card">
			<div className="card-body">
				<Link href={`/stories/${story.slug}`}>
					<a className="text-primary">
						{ story.is_finished && <span className="badge success finished-card-badge">finished</span> }
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
		</div>
	)
}


export default SmallCard