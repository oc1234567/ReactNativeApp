
export default function createActions(Actions, store) {
    let actions = {}
    let keysOfActions = Object.keys(Actions);
    keysOfActions.forEach((value) => {
        actions[value] = (data) => {store.dispatch({type: value, data})} 
    })
    return actions
}
