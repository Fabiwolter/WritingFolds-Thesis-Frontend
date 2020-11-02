import Layout from '../../../components/Layout'
import Private from '../../../components/auth/Private'
import StoryRead from '../../../components/crud/StoryRead'
import { isAuthenticated } from '../../../actions/authAction'

const StoryManager = () => {
	const username = isAuthenticated() && isAuthenticated().username

	return (
		<Layout>
			<Private>
				<div className="container-fluid">
					<div className="row">
						<div className="col md-12">
							<h2>Manage your Stories</h2>
						</div>
						<div className="col md-12">
							<StoryRead username={username} />
						</div>
					</div>
				</div>
			</Private>
		</Layout>
	)
}

export default StoryManager