import { useContext } from 'react'
import Context from '../initContext'
import useUpdate from './useUpdate'

export default function useSubstate(selectSubstate) {

    let { store } = useContext(Context)
    let substate = useUpdate(store, ()=>{
        const state = store.getState();
        return selectSubstate(state);
    })
    return substate;
    
}