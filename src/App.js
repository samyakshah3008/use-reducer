import { useReducer } from 'react';
import './App.css';
import { useCounter } from './Counter-context';

function App() { 

  const {initialState,dispatch} = useCounter()
 
  const reducerFunction2 = (state2,action2) => {
        return {...state2, counter2: state2.counter2 - action2.payload2}
  }

  const [initialState2, dispatch2] = useReducer(reducerFunction2, {counter2: 1000})

  const clickHandler = () => {
    dispatch({type: "increment", payload: 20})
  }

  const clickHandler2 = () => {
    dispatch2({type2: "increment", payload2: 20})
  }
  


  return (
    <div className="App">
        <div>Counter</div>
        <button onClick={clickHandler} >+</button>
        <button onClick={clickHandler2}>-</button>
        <div>Output will be shown here</div>
        <div>{initialState.counter}</div>
        <div> {initialState2.counter2} </div>
    </div>
  );
}

export default App;
