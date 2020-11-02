import Layout from '../../../components/Layout'
import Private from '../../../components/auth/Private'
import StoryUpdate from '../../../components/crud/StoryUpdate'

const Story = () => {
	return (
		<Layout>
			<Private>
				<div className="container-fluid">
					<div className="row">
						<div className="col sm-12">
							<h2>Update Story</h2>
						</div>
						<div className="col sm-12">
							<StoryUpdate />
						</div>
					</div>
				</div>
			</Private>
		</Layout>
	)
}

export default Story