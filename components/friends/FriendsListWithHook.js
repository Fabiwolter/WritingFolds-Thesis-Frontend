import {useProfile} from '../../dataHooks/userHooks'
import {getCookie} from '../../actions/authAction'
import FriendCard from './FriendCard'


const FriendsListWithHook = () => {
    const token = getCookie('token')
    const { profile, isLoading, error } = useProfile(token)

    if (isLoading) {
        return (
            <div className="alert alert-primary">loading friends...</div>
        )
    } else if (error) {
        <div className="alert alert-danger">Error loading friends...</div>
    } else {
        return (
            <div className="row">
                {profile.friends.map((friend, i) => {
                    return (
                        <FriendCard friend={friend} key={i}/>
                    )
                })}
            </div>
        )
    }
}

export default FriendsListWithHook