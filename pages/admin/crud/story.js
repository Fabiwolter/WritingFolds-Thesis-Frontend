import Layout from '../../../components/Layout'
import StoryCreate from '../../../components/crud/StoryCreate'
import Admin from '../../../components/auth/Admin'

const Story = () => {
	return (
		<Layout>
			<Admin>
				<div className="container-fluid">
					<div className="row">
						<div className="col md-12">
							<h2>Create a new Story</h2>
						</div>
						<div className="col md-12">
							<StoryCreate/>
						</div>
					</div>
				</div>
			</Admin>
		</Layout>
	)
}

export default Story;