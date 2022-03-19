import { createContext, useContext } from "react";
import {reducerFunction} from "./Counter-reducer"
import { useReducer } from 'react';


const CounterContext = createContext() 

const useCounter = () => useContext(CounterContext) 

const CounterProvider = ({children}) => {
  const [initialState, dispatch] = useReducer(reducerFunction, {counter: 0}) 
    
    return (
        <CounterContext.Provider value={{initialState,dispatch}}>
            {children}
        </CounterContext.Provider>
    )
}

export {useCounter,CounterProvider}