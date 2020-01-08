
export default function createActions(Actions, store) {
    let actions = {}
    let keysOfActions = Object.keys(Actions);
    keysOfActions.forEach((key) => {
        actions[key] = (data) => {store.dispatch({type: key, data})} 
    })
    return actions
}
