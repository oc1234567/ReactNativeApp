
import { useRef, useState, useEffect} from 'react'
import shallowEqual from "../utils/shallowEqual"

export default function useUpdate(store, getStateFn) {
    let [state, setState] = useState(getStateFn());
    
    const prevStateRef = useRef();
    useEffect(() => {
      prevStateRef.current = state;
    });

    useEffect(
        () => {
          const checkForUpdates = () => {
            const nextState = getStateFn();
    
            if (shallowEqual(prevStateRef.current, nextState)) {
              return;
            }
    
            setState(nextState)
          };
          checkForUpdates();
    
          return store.subscribe(checkForUpdates);
        },
        [store, getStateFn]
    );

    return state;
}