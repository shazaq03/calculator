import React from "react";
import { useReducer } from "react";
import NumberButtons from "./NumberButtons.js";
import OperationButtons from "./OperationButton.js";

export const ACTIONS = {
  ADD_DIGITS: "add-digits",
  DELETE: "delete-digit",
  CHOOSE_OPERATION: "choose-operation",
  ALL_CLEAR: "all-clear",
  EVALUATE: "evaluate"
};

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us",{maximumFractionDigits:0});

function formatOperand(operand){
  if(operand == null) return
  const [integer, decimal] = operand.split(".")
  if(decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function reducer(state, {type, payload}){

  switch(type){
    case ACTIONS.ADD_DIGITS: 
      if (payload.digit === "0" && state.currentOperand === "0") return state;
      if(payload.digit === "." && state.currentOperand.includes(".")) return state;
      if(state.overwrite === true){
       return{
        ...state,
        currentOperand: payload.digit,
        overwrite: false,
       }

      }
      return{
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      }

    case ACTIONS.ALL_CLEAR:
      return{}
    
    case ACTIONS.DELETE:
      if(state.currentOperand == null){
        return state;
      }
      const str = [...state.currentOperand];
      const length = str.length;
      const final = state.currentOperand.slice(0, length-1);
      if(state.overwrite){
        return{
          ...state,
          overwrite:false,
          currentOperand: null,
        }
      }
      if(length === 1){
        return{
          ...state,
          currentOperand: null,
        }
      }
      return {
        ...state,
        currentOperand: final
      }

    case ACTIONS.CHOOSE_OPERATION:
      if(state.currentOperand == null && state.previousOperand == null) {
        return state;
      }
      if(state.currentOperand == null){
        return{
          ...state,
          operation: payload.operation,
        }
        
      }
      if(state.previousOperand == null){
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        }
      }
      return{
        ...state,
        previousOperand: evaluate(state),
        currentOperand:null,
        operation: payload.operation,
      }
    case ACTIONS.EVALUATE:
      if(state.previousOperand == null || state.currentOperand == null || state.operation == null){
        return state;
      }
      return{
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      }


  }
}

function evaluate({currentOperand, previousOperand, operation}){
  const current = parseFloat(currentOperand) ;
  const prev = parseFloat(previousOperand) ;
  if(isNaN(prev) || isNaN(current)) return "";
  let value = "";
  switch(operation){
    case "+":
      value = current + prev;
      break;
    case "-":
      value = prev - current;
      break;
    case "*":
      value = prev * current;
      break;
    case "÷":
      value = prev / current;
      break;

  }
  return value.toString();
}

function App() {
  
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {});
  

  
  return (
    <div className="calculator-container">
      <div className="output">
        <div className="previous-operand">{formatOperand(previousOperand)}{operation}</div>
        <div className="current-operand">{formatOperand(currentOperand)}</div>
      </div>
      <button className="span-2" onClick={() => dispatch({type:ACTIONS.ALL_CLEAR})}>AC</button>
      <button onClick={() => dispatch({type:ACTIONS.DELETE})}>DEL</button>
      
      <OperationButtons operation= "÷" dispatch={dispatch} />
      <NumberButtons digit= "1" dispatch={dispatch} />
      <NumberButtons digit= "2" dispatch={dispatch} />
      <NumberButtons digit= "3" dispatch={dispatch} />
      <OperationButtons operation= "*" dispatch={dispatch} />
      <NumberButtons digit= "4" dispatch={dispatch} />
      <NumberButtons digit= "5" dispatch={dispatch} />
      <NumberButtons digit= "6" dispatch={dispatch} />
      <OperationButtons operation= "+" dispatch={dispatch} />
      <NumberButtons digit= "7" dispatch={dispatch} />
      <NumberButtons digit= "8" dispatch={dispatch} />
      <NumberButtons digit= "9" dispatch={dispatch} />
      <OperationButtons operation= "-" dispatch={dispatch} />
      <NumberButtons digit= "." dispatch={dispatch} />
      <NumberButtons digit= "0" dispatch={dispatch} />
      <button className="span-2" onClick={() => dispatch({type:ACTIONS.EVALUATE})}>=</button>
    
    </div>
  );
}

export default App;