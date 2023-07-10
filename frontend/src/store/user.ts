
export default function user(
    state = {
    username: '',
    age: 18
}, action) {
    switch(action.type) {
        case 'modifyUser':
            return {
                ...action.payload
            }
        case 'logout':
            return null
        default:
            return state

    }
}