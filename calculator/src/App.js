import { useReducer} from "react"
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";
import './styles.css';


export const ACTIONS ={
  ADD_DIGIT: 'add-digits',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGITS: 'delete-digits',
  EVALUATE: 'evaluate'
}

function reducer(state, { type, payload }) {
switch(type) {
  case ACTIONS.ADD_DIGIT:
    if(payload.digit === "0" && state.currentDigits === "0") {
      return state
    }
    if(payload.digit === "." && state.currentDigits.includes(".")) {
      return state
    }
    return{
      ...state, 
      currentDigits: `${state.currentDigits || ""}${payload.digit}`
    }
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentDigits === null && state.previousDigits === null) {
        return state
      }
      if(state.previousDigits == null){
        return {
          ...state, 
          operation: payload.operation, 
          previousDigits: state.currentDigits, 
          currentDigits: null,
        }
      }
        return{
          ...state, 
          previousDigits: evaluate(state), 
          operation:payload.operation,
          currentDigits: null,
        }

      
    case ACTIONS.CLEAR:
      return {}
  }
}

function evaluate({currentDigits, previousDigits, operation}){
  const prev = parseFloat(previousDigits);
  const current = parseFloat(currentDigits); 

  if (isNaN(prev) || isNaN(current)) return ''; 
  let computation = ''; 
  switch (operation) {
    case '+':
      computation = prev + current 
       break
    case '-': 
    computation = prev - current 
       break 
    case '*': 
    computation = prev * current
       break
    case '/': 
    computation = prev / current
       break 
  }
  return computation.toString()
}

function App() {
  const [{currentDigits, previousDigits, operation }, dispatch] = useReducer(reducer, {})

  
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-digits">{previousDigits} {operation}</div>
        <div className= "current-digits">{currentDigits}</div>
      </div>
      <button className="span-two" onClick={() => dispatch({type : ACTIONS.CLEAR})}>AC</button>
      <button>DEL</button>
      <OperationButton operation = "/" dispatch={dispatch} />
      <DigitButton digit = "1" dispatch={dispatch} />
      <DigitButton digit = "2" dispatch={dispatch} />
      <DigitButton digit = "3" dispatch={dispatch} />
      <OperationButton operation = "*" dispatch={dispatch} />
      <DigitButton digit = "4" dispatch={dispatch} />
      <DigitButton digit = "5" dispatch={dispatch} />
      <DigitButton digit = "6" dispatch={dispatch} />
      <OperationButton operation = "+" dispatch={dispatch} />
      <DigitButton digit = "7" dispatch={dispatch} />
      <DigitButton digit = "8" dispatch={dispatch} />
      <DigitButton digit = "9" dispatch={dispatch} />
      <OperationButton operation = "-" dispatch={dispatch} />
      <DigitButton digit = "." dispatch={dispatch} />
      <DigitButton digit = "0" dispatch={dispatch} />
      <button className="span-two">=</button>
    </div>
  );
}
 
export default App;
