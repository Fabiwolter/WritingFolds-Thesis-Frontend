import Layout from '../../../components/Layout'
import StoryUpdate from '../../../components/crud/StoryUpdate'
import Admin from '../../../components/auth/Admin'

const Blog = () => {
	return (
		<Layout>
			<Admin>
				<div className="container-fluid">
					<div className="row">
						<div className="col md-12">
							<h2>Update Story</h2>
						</div>
						<div className="col md-12">
							<StoryUpdate />
						</div>
					</div>
				</div>
			</Admin>
		</Layout>
	)
}

export default Blog;