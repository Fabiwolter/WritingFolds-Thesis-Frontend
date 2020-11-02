import Link from 'next/link'
import Layout from '../../components/Layout'
import { getUserPublicProfile } from '../../actions/userAction'
import moment from 'moment'
import SmallCard from '../../components/story/SmallCard'
import { API } from '../../config'
import ContactForm from '../../components/form/contactForm'
import FriendAddRemove from '../../components/crud/FriendAddRemove'
import {isAuthenticated} from '../../actions/authAction'
import FriendsList from '../../components/friends/FriendsList'

const UserProfile = ({ user, stories }) => {

	const username = isAuthenticated() && isAuthenticated().username

	const showUserStories = () => {
		return stories.map((story, i) => {
			return (
				<article key={i} className="col sm-12 padding-none margin-bottom">
					<SmallCard story={story}/>
				</article>
			)
		})
	}


	return (
		<React.Fragment>
			<Layout>
				<div className="row margin-none">
					<div className="col sm-12">
						<div className="row">
							<div className="sm-4 md-3 lg-2 padding-top">
								<img
									src={`${API}/user/photo/${user.username}`}
									className=""
									style={{ maxHeight: '170px', maxWidth: '100%', minHeight: '100%',backgroundColor: '#41403e' }}
									alt="user profile"
								/>
							</div>
							<div className="sm-8 md-5 lg-5 padding-left padding-right">
								<h3>{user.name}</h3>
								<p>Joined {moment(user.createdAt).fromNow()}</p>
							</div>
							<div className=" sm-12 md-4 lg-4 padding-top-large align-right">
								<p>{user.about}</p>

								{ !isAuthenticated() ?
									<div></div>
									:
									 username === user.username ?

										 <div>
											 <Link href="/user/update">
												 <button className="btn btn-secondary">
													 Update Profile
												 </button>
											 </Link>
										 </div>
										:
										 <FriendAddRemove friendUsername={user.username} />
								}
							</div>
						</div>
					</div>
				</div>

				<div className="">
					<div className="row">
						<div className="col md-6 sm-12 padding-top-none">
							<div className="paper padding">
								<h3 className="margin-top-none">recent Stories by {user.name}</h3>
								<div className="row">
									{showUserStories()}
								</div>
							</div>
						</div>

						<div className="col md-6 sm-12 padding-top-none">
							<div className="paper padding">
								<h3 className="margin-top-none">{user.name}'s Friends</h3>

								<FriendsList friends={user.friends}/>
							</div>

							<div className="paper padding margin-top">
								<h3 className="margin-top-none">message {user.name}</h3>
								<ContactForm userEmail={user.email}/>
							</div>

						</div>
					</div>
				</div>
			</Layout>
		</React.Fragment>
	)
}

UserProfile.getInitialProps = ({query}) => {
	return getUserPublicProfile(query.username).then(data => {
		if (data.error) {
			console.log(data.error)
		} else {
			return {user: data.user, stories: data.stories}
		}
	})
}

export default UserProfile