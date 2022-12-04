import React from 'react';
import { ACTIONS } from './App';

function OperationButtons({ operation, dispatch}){
    
    
    
    return(
        <button
            onClick={() => dispatch({type: ACTIONS.CHOOSE_OPERATION, payload: {operation:operation}})}
            >
            {operation}
            </button>
    )
}

export default OperationButtons;