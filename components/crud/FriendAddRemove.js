import {getCookie} from '../../actions/authAction'
import {useEffect, useState} from 'react'
import {addUserFriend, removeUserFriend} from '../../actions/userAction'
import {useProfile} from '../../dataHooks/userHooks'
import {checkIfUsernameIsInArrayOfUsers} from '../../helperMethods/friendHelper'

const FriendAddRemove = ({friendUsername}) => {


    const token = getCookie('token')
    const {profile, isLoading, error} = useProfile(token)
    const [isFriend, setIsFriend] = useState(undefined)


    useEffect(() => {
        profile && setIsFriend(checkIfUsernameIsInArrayOfUsers(friendUsername, profile.friends))
    }, [profile, friendUsername])


    const addFriend = (e) => {
        e.preventDefault()
        setIsFriend(!isFriend)
        addUserFriend(token, {friendUsername}).then(data => {
            if (data.error) {
                console.log(data.error)
            } else{
                const isFriendUpdated = checkIfUsernameIsInArrayOfUsers(friendUsername, data.friends)
                setIsFriend(isFriendUpdated)
            }
        })
    }

    const removeFriend = (e) => {
        e.preventDefault()
        setIsFriend(!isFriend)
        removeUserFriend(token, {friendUsername}).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                const isFriendUpdated = checkIfUsernameIsInArrayOfUsers(friendUsername, data.friends)
                setIsFriend(isFriendUpdated)
            }
        })
    }


    return (
        <div>
            {!isLoading &&
            isFriend ?
                <button className="btn btn-danger-outline" onClick={removeFriend}>
                    remove Friend
                </button>
                :
                <button className="btn btn-secondary" onClick={addFriend}>
                    add Friend
                </button>
            }
        </div>
    )
}

export default FriendAddRemove