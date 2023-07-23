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
// eslint-disable-next-line default-case
switch(type) {
  case ACTIONS.ADD_DIGIT:
    if (state.overwrite) {
      return {
        ...state, 
        currentDigits: payload.digit, 
        overwrite: false,
      }
    }
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

      if (state.currentDigits === null){
        return{
          ...state, 
          operation: payload.operation,
        }
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

      case ACTIONS.EVALUATE:
        if (state.operation == null || state.previousDigits == null || state.currentDigits == null){
          return state
        }

        return {
          ...state, 
          previousDigits: null, 
          overwrite: true,
          operation: null,
          currentDigits: evaluate(state), 
        }

        case ACTIONS.DELETE_DIGITS:
          if(state.overwrite){
            return{
              ...state, 
              overwrite: false, 
              currentDigits: null
            }
          }
          if(state.currentDigits == null) return state
          if(state.currentDigits.length ===1){
            return{
              ...state, 
              currentDigits:null
            }
          }
          return{
            ...state, 
            currentDigits: state.currentDigits.slice(0, -1) // will remove the last digit
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
  // eslint-disable-next-line default-case
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

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})
function formatOperand(operand) {
  if (operand == null) return
  const [integer, decimal] = operand.split(".")
  if (decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function App() {
  const [{currentDigits, previousDigits, operation }, dispatch] = useReducer(reducer, {})

  
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-digits">{formatOperand(previousDigits)} {operation}</div>
        <div className= "current-digits">{formatOperand(currentDigits)}</div>
      </div>
      <button className="span-two" onClick={() => dispatch({type : ACTIONS.CLEAR})}>AC</button>
      <button onClick={() => dispatch({type : ACTIONS.DELETE_DIGITS})}>DEL</button>
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
      <button className="span-two" onClick={() => dispatch({type : ACTIONS.EVALUATE})}>=</button>
    </div>
  );
}
 
export default App;
