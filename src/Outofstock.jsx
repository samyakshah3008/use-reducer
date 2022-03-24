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

      default:
        break;
    }
  };

  const [state, dispatch] = useReducer(reducerCallBack, {
    cartItems: [],
    range: 1000
  });

  const finalFilterData = data.filter((item) => item.price <= state.range);

  const [stock, setStock] = useState(false);

  const outOfStockChangeHandler = (checked) => {
    if (checked) {
      setStock(true);
    } else {
      setStock(false);
    }
  };

  // console.log(stock);

  const stockFilterData = data.filter((item) =>
    stock ? item : item.inStock === true
  );

  return (
    <>
      <input
        onClick={(e) => outOfStockChangeHandler(e.target.checked)}
        type="checkbox"
      />
      <label>Include out of stock </label>
      <hr />
      <input
        type="range"
        min="0"
        max="1000"
        onChange={(e) => dispatch({ type: "RANGER", payload: e.target.value })}
      />
      <label> 0 - {state.range} </label>

      <div className="App" style={{ display: "flex", flexWrap: "wrap" }}>
        {stockFilterData.map(
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
