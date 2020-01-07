import { createStore } from 'redux'


export default function(reducer, preloadedState) {
    return createStore(reducer, preloadedState);
}