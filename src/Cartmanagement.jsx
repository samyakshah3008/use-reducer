import { useReducer, useState } from "react"

export function CartManagement(){ 

    const  itemsInCart =  [
        {
          "id": 1,
          "name": "kala chasma",
          "price": 1000
        },
        {
          "id": 2,
          "name": "laal chhadi",
          "price": 500
        },
        {
          "id": 3,
          "name": "jalebi",
          "price": 50
        },
        {
          "id": 4,
          "name": "japani joota",
          "price": 10000
        }
      ]



      const reducerFunction3 = (state,action) => {

        switch (action.type) {
          case "ADD_TO_CART":
            
            return {...state, cartItems: state.cartItems + 1, totalPrice: state.totalPrice + action.payload}
        
          case "REMOVE_FROM_CART":

            return {...state, cartItems: state.cartItems - 1, totalPrice: state.totalPrice - action.payload}
          
        
          default:
           return state;
        }

      }

     

      const [state, dispatch] = useReducer(reducerFunction3, {cartItems:0, totalPrice: 0}) 

    return (
        <div>
    
        <h1>My Cart</h1>
        <h2>Items: {state.cartItems} </h2>
        <h2>Total Price: {state.totalPrice} </h2> 

        <h1>Items </h1>
        <div> {itemsInCart.map(({name, price}) => (<> <div> {name} </div> <p>{price}</p> <button onClick={()=> dispatch({type: "ADD_TO_CART", payload: price})} >Add to Cart</button> <button onClick={()=> dispatch({type: "REMOVE_FROM_CART", payload: price})} >Add to Cart</button> </>) )} </div> 
        </div>
        )
}