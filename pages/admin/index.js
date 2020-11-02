import Layout from '../../components/Layout'
import Admin from '../../components/auth/Admin'
import TagAddRemove from "../../components/crud/TagAddRemove";
import StoryReadDashboard from "../../components/crud/StoryReadDashboard";

const AdminIndex = () => {
	return (
		<Layout>
			<Admin>
				<div className="container-fluid">
					<div className="row">
						<div className="col md-12">
							<h2>Admin Dashboard</h2>
						</div>
					</div>
					<div className="row">
						<div className="col lg-4 md-5 sm-6">
							<div className="paper padding">
								<h3 className="margin-top-none">✒️ Tags</h3>
								<TagAddRemove/>
							</div>
						</div>
						<div className="col lg-8 md-7 sm-6">
							<div className="paper padding">
								<h3 className="margin-top-none">✒️ all Stories</h3>
								<StoryReadDashboard />
							</div>
						</div>
					</div>
				</div>
			</Admin>
		</Layout>
	)
}

export default AdminIndex;