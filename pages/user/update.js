import Layout from '../../components/Layout'
import Private from '../../components/auth/Private'
import ProfileUpdate from '../../components/auth/ProfileUpdate'

const UserProfileUpdate = () => {
	return (
		<Layout>
			<Private>
				<div className="container-fluid">
					<div className="row">
						<div className="col sm-12">
							<h2>Update User Information</h2>
						</div>
					</div>
					<div className="row">
						<ProfileUpdate />
					</div>
				</div>
			</Private>
		</Layout>
	)
}

export default UserProfileUpdate;