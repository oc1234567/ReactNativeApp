import React, { useRef } from 'react'
import Context from './initContext'
import createStore from './initStore'
import createActions from './initDispatch'

export default function(props) {
    let {actions, initinalState} = props;

    let reducer = useRef(function initReducer(state, action) {
        let key = action.type;
        if (actions[key]) {
            return actions[key](state, action.data);
        }else {
            return state;
        }
    })
    let store = createStore(reducer.current, initinalState)
    let currentActions = createActions(actions, store)

    let value = {
        store: store,
        actions: currentActions,
    };

    return <Context.Provider value={value}>{props.children}</Context.Provider>
}
