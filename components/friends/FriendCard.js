import Link from 'next/link'
import {API} from '../../config'


const FriendCard = ({friend}) => {
	return (
		<div className="col sm-12 padding-none margin-none">
			<div className="card" style={{boxShadow: "none"}}>
				<div className="card-body">
					<div className="row margin-none">
						<div className="sm-3">
							<div className="border border-primary" style={{maxHeight: "60px", maxWidth: '60px', overflow: "hidden"}}>
								<img
									src={`${API}/user/photo/${friend.username}`}
									className="margin-none padding-none friendlist-picture"
									style={{ }}
									alt="profile picture"
								/>
							</div>
						</div>
						<div className="sm-9 padding-left align-middle">
							<Link href={`/profile/${friend.username}`}>
								<a><h5>{friend.name}</h5></a>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}


export default FriendCard