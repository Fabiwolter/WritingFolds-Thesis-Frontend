import Layout from '../../../components/Layout'
import StoryRead from '../../../components/crud/StoryRead'
import Admin from '../../../components/auth/Admin'

const Stories = () => {
	return (
		<Layout>
			<Admin>
				<div className="container-fluid">
					<div className="row">
						<div className="col md-12">
							<h2>Manage Stories</h2>
						</div>
						<div className="col md-12">
							<StoryRead/>
						</div>
					</div>
				</div>
			</Admin>
		</Layout>
	)
}

export default Stories;