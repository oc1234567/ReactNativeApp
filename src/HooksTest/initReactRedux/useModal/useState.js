import React, { useContext } from 'react';
import Context from "../initContext"

export default function useState() {
    let value = useContext(Context);
    let {state} = value;
    return state;
}