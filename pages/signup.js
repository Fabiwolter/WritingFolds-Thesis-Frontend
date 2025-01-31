import Layout from '../components/Layout'
import SignupComponent from '../components/auth/SignupComponent'

const Signup = () => {
	return (
		<Layout>
			<h2 className="text-center pt-4 pb-4">Signup</h2>
			<div className="row flex-center">
				<div className="col md-6 sm-6">
					<SignupComponent/>
				</div>
			</div>
		</Layout>
	)
}

export default Signup;