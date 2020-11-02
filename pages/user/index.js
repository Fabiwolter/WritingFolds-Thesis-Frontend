import Layout from '../../components/Layout'
import Private from '../../components/auth/Private'
import { isAuthenticated } from '../../actions/authAction'
import TagAddRemove from "../../components/crud/TagAddRemove";
import StoryReadDashboard from "../../components/crud/StoryReadDashboard";
import FriendsListWithHook from "../../components/friends/FriendsListWithHook";

const UserIndex = () => {
	const username = isAuthenticated() && isAuthenticated().username

	return (
		<Layout>
			<Private>
				<div className="container-fluid">
					<div className="row">
						<div className="col md-12">
							<h2>{isAuthenticated() && isAuthenticated().name}`s dashboard</h2>
						</div>
					</div>

					<div className="row">
						<div className="col lg-4 sm-6">
							<div className="paper padding">
								<h3 className="margin-top-none">✒️ Tags</h3>
								<TagAddRemove/>
							</div>
						</div>
						<div className="col lg-4 sm-6">
							<div className="paper padding">
								<h3 className="margin-top-none">✒️ your Stories</h3>
								<StoryReadDashboard username={username} />
							</div>
						</div>
						<div className="col lg-4 sm-6">
							<div className="paper padding">
								<h3 className="margin-top-none">your Friendslist</h3>
								<FriendsListWithHook />
							</div>
						</div>
					</div>
				</div>
			</Private>
		</Layout>
	)
}

export default UserIndex;