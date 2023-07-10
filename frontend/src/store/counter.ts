

export default function counter(state, action) {
    console.log('=>statestate', state)
    if (typeof state === "undefined") {
        return 0
    }
    switch(action.type) {
        case 'increment':
            return state + 1
        case 'decrement':
            return state - 1
        default:
            return state
    }
}