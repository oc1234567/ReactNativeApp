import React, { useContext } from 'react';
import Context from "../initContext"

export default function useDispatch() {
    let value = useContext(Context);
    let actions = value && value.actions || null
    return actions; 
    
}