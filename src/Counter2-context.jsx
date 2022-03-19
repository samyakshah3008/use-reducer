import { createContext, useContext } from "react";
import { useReducer } from 'react';
import { reducerFunction2 } from "./Counter2-reducer";



const CreateCounter2 = createContext(null)

const useCounter2 = () => useContext(CreateCounter2)


const Counter2Provider = ({children}) => {
  const [initialState2, dispatch2] = useReducer(reducerFunction2, {counter2: 1000})

    return(
        <CreateCounter2.Provider value={{initialState2, dispatch2}}>
            {children}
        </CreateCounter2.Provider>
    )
}



export {Counter2Provider, useCounter2}