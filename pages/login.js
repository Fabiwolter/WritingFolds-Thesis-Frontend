import Layout from '../components/Layout'
import LoginComponent from '../components/auth/LoginComponent'
import { withRouter } from 'next/router'

const Login = ({router}) => {
	const showRedirectMessage = () => {
		if (router.query.message) {
			return <div className="row flex-center">
				<div className="col md-6 sm-6">
					<div className="alert alert-primary">
						{router.query.message}
					</div>
				</div>
			</div>
		}
	}

	return (
		<Layout>
			<h2 className="text-center pt-4 pb-4">Login</h2>
			{showRedirectMessage()}
			<div className="row flex-center">
				<div className="col md-6 sm-6">
					<LoginComponent/>
				</div>
			</div>
		</Layout>
	)
}

export default withRouter(Login);