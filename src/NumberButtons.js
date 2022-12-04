import React from 'react';
import { ACTIONS } from './App';

function NumberButtons({dispatch, digit}){
    
    
    
    return(
        <button
            onClick={() => dispatch({type: ACTIONS.ADD_DIGITS, payload: {digit:digit}})}
            >
            {digit}
            </button>
    )
}

export default NumberButtons;