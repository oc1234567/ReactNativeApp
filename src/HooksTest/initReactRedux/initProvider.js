import React, { useState, useMemo, useEffect, useContext, useRef } from 'react'
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
    let store = useRef(createStore(reducer.current, initinalState))
    let currentActions = useRef(createActions(actions, store.current))
    
    function getActions() {
        return currentActions.current
    }

    let state = useUpdate(store.current)

    let value = {
        state: state,
        actions: getActions(),
    };

    return <Context.Provider value={value}>{props.children}</Context.Provider>
}

function useUpdate(store) {
    let [state, setState] = useState(store.getState());
    
    const unsubscribe = useMemo(()=>{
        return store.subscribe(() => {
            console.log('update...');
            setState(store.getState())
        })
    }, [store])

    useEffect(() => {
        return () => {
            console.log('unsubscribe...')
            unsubscribe()
        }
    }, [])

    return state;
}