import './App.css';
import { CartManagement } from './Cartmanagement';
import { useCounter } from './Counter-context';
import { useCounter2 } from './Counter2-context';

function App() { 

  const {initialState,dispatch} = useCounter()
 
  const {initialState2, dispatch2} = useCounter2()

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
        <CartManagement/>
    </div>
  );
}

export default App;
