import FriendCard from './FriendCard'


const FriendsList = ({friends}) => {
    return (
        <div className="row">
            {friends.map((friend, i) => {
                return (
                    <FriendCard friend={friend} key={i} />
                )
            })}
        </div>
    )
}

export default FriendsList