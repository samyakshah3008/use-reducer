import { useReducer, useState } from "react";
import "./styles.css";

export default function CartManagement2() {
  const itemsInCart = [
    {
      id: 1,
      name: "kala chasma",
      price: 1000
    },
    {
      id: 2,
      name: "laal chhadi",
      price: 500
    },
    {
      id: 3,
      name: "jalebi",
      price: 50
    },
    {
      id: 4,
      name: "japani joota",
      price: 10000
    }
  ];


  const clickHandler = (price) => {
    console.log("clicked");
    dispatch({ price });
  };

  const reducerCallBack = (state, action) => {
    console.log(action);
    return { ...state, price: state.price + action.price, counter: state.counter + 1 };
  };

  const [state, dispatch] = useReducer(reducerCallBack, { price: 0, counter: 0 });

  return (
    <div>
      <h2>Cart</h2>
      <h2>Items in Cart {state.counter} </h2>
      <h2> Price {state.price} </h2>
      <h2>
        
        {itemsInCart.map((item) => (
          <li key={item.id}>
            
            {item.name}
            <button onClick={() => clickHandler(item.price)}>
              
              Add to Cart
            </button>
          </li>
        ))}
      </h2>
    </div>
  );
}
