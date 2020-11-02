import Layout from '../../../components/Layout'
import Private from '../../../components/auth/Private'
import StoryCreate from '../../../components/crud/StoryCreate'

const Story = () => {
	return (
		<Layout>
			<Private>
				<div className="container-fluid">
					<div className="row">
						<div className="col sm-12">
							<h2>Create a new Story</h2>
						</div>
						<div className="col sm-12">
							<StoryCreate />
						</div>
					</div>
				</div>
			</Private>
		</Layout>
	)
}

export default Story