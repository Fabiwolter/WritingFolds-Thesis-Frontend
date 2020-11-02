export const checkIfUsernameIsInArrayOfUsers = (username, friends) => {
    if (friends.length >= 1) {
        if (friends.find(friend => friend.username === username)) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}