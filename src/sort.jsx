import React, { useReducer, useState } from "react";
import "./styles.css";

import faker from "faker";

faker.seed(123);

const data = [...Array(50)].map((item) => ({
  id: faker.random.uuid(),
  name: faker.commerce.productName(),
  image: faker.random.image(),
  price: faker.commerce.price(),
  material: faker.commerce.productMaterial(),
  brand: faker.lorem.word(),
  inStock: faker.random.boolean(),
  fastDelivery: faker.random.boolean(),
  ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
  offer: faker.random.arrayElement([
    "Save 50",
    "70% bonanza",
    "Republic Day Sale"
  ]),
  idealFor: faker.random.arrayElement([
    "Men",
    "Women",
    "Girl",
    "Boy",
    "Senior"
  ]),
  level: faker.random.arrayElement([
    "beginner",
    "amateur",
    "intermediate",
    "advanced",
    "professional"
  ]),
  color: faker.commerce.color()
}));

export default function App() {
  const reducerCallBack = (state, action) => {
    switch (action.type) {
      case "RANGER":
        return { ...state, range: action.payload };

      case "ONLY_IN_STOCK":
        return { ...state, onlyInStock: action.payload };

      case "FAST_DELIVERY":
        return { ...state, fastDelivery: action.payload };

      case "HIGH_TO_LOW":
        return {
          ...state,
          data: [...state.data].sort((a, b) => b.price - a.price)
        };

      case "LOW_TO_HIGH":
        return {
          ...state,
          data: [...state.data].sort((a, b) => a.price - b.price)
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducerCallBack, {
    data: data, // from api
    range: 1000,
    onlyInStock: false,
    fastDelivery: false,
    sortBy: ""
  });

  const fastDeliveryFilter = data.filter((item) =>
    state.fastDelivery ? item.fastDelivery === true : item
  );

  const stockFilter = data.filter((item) =>
    state.onlyInStock ? item.inStock === true : item
  );

  const rangeFilter = data.filter((item) => item.price <= state.range);

  // using useState for outofstock functionality

  return (
    <>
      <input
        type="checkbox"
        onClick={(e) =>
          dispatch({ type: "ONLY_IN_STOCK", payload: e.target.checked })
        }
      />

      <label>Only include instock </label>
      <hr />
      <input
        type="checkbox"
        onClick={(e) =>
          dispatch({ type: "FAST_DELIVERY", payload: e.target.checked })
        }
      />
      <label>Only fast delivery </label>
      <hr />
      <input
        type="range"
        min="0"
        max="1000"
        onChange={(e) => dispatch({ type: "RANGER", payload: e.target.value })}
      />

      <label> 0 - {state.range} </label>
      <hr />

      <input
        value="HIGH_TO_LOW"
        name="toggle"
        onClick={(e) => dispatch({ type: "HIGH_TO_LOW" })}
        type="radio"
      />
      <label> High to low </label>

      <input
        value="LOW_TO_HIGH"
        name="toggle"
        onClick={(e) => dispatch({ type: "LOW_TO_HIGH" })}
        type="radio"
      />
      <label> low to high </label>

      <div className="App" style={{ display: "flex", flexWrap: "wrap" }}>
        {state.data.map(
          ({
            id,
            name,
            image,
            price,
            productName,
            inStock,
            level,
            fastDelivery
          }) => (
            <div
              key={id}
              style={{
                border: "1px solid #4B5563",
                borderRadius: "0 0 0.5rem 0.5rem",
                margin: "1rem",
                maxWidth: "40%",
                padding: "0 0 1rem"
              }}
            >
              <img src={image} width="100%" height="auto" alt={productName} />
              <h3> {name} </h3>
              <div>Rs. {price}</div>
              {inStock && <div> In Stock </div>}
              {!inStock && <div> Out of Stock </div>}
              <div>{level}</div>
              {fastDelivery ? (
                <div> Fast Delivery </div>
              ) : (
                <div> 3 days minimum </div>
              )}
            </div>
          )
        )}
      </div>
    </>
  );
}
