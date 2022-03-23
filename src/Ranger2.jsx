import React, { useReducer, useState } from "react";
import "./styles.css";

import faker from "faker";
import { Filters } from "./Components/Filters";
import { useFilter } from "./Contexts/filter-context";

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

// data.map((item) => console.log(item.price));

export default function App() {
  const [showCard, setShowCard] = useState([]);

  const changeHandler = (e) => {
    const filteredData = data.filter(
      (item) => Number(item.price) <= Number(e.target.value)
    );
    // setShowCard(filteredData);
    dispatch({ type: "RANGER", payload: filteredData });
  };

  const reducerCallBack = (state, action) => {
    switch (action.type) {
      case "GET_PRODUCTS":
        return { ...state, cartProducts: action.payload };

      case "RANGE":
        return {
          ...state,
          maxRange: action.payload
        };

      default:
        break;
    }
  };

  const [state, dispatch] = useReducer(reducerCallBack, {
    cartProducts: [],
    maxRange: 1000
  });

  // console.log(state.maxRange);

  // const getFilteredProduct = (productList) => {
  const forMap = data.filter((item) => item.price <= state.maxRange);
  // };
  // console.log(state.maxRange)

  return (
    <>
      {/* <Filters /> */}

      <div>
        <input
          min="0"
          max="1000"
          // value={userValue}
          onChange={(e) => dispatch({ type: "RANGE", payload: e.target.value })}
          type="range"
        />
      </div>

      <div className="App" style={{ display: "flex", flexWrap: "wrap" }}>
        {forMap.map(
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

              <div> {price} </div>

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
