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

      case "SORT_BY":
        return { ...state, sortBy: action.payload };

      case "RATINGS":
        return { ...state, ratings: action.payload };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducerCallBack, {
    range: 1000,
    onlyInStock: false,
    fastDelivery: false,
    sortBy: null,
    ratings: null
  });

  // For price Range

  const priceRangeFilter = (priceList, filterPriceList) => {
    return [...priceList].filter((item) => item.price <= filterPriceList);
  };

  const priceRangeList = priceRangeFilter(data, state.range);
  console.log(priceRangeList);

  // end of price range

  // start of include instock only

  const stockFilter = (stockList, filterStockList) => {
    return [...stockList].filter((item) =>
      filterStockList ? item.inStock === true : item
    );
  };

  const stockFilterList = stockFilter(priceRangeList, state.onlyInStock);

  console.log(stockFilterList);

  // end of include instock only

  // start of fast delivery

  const fastDeliveryFilter = (fastDeliveryProdList, filterProdList) => {
    return [...fastDeliveryProdList].filter((item) =>
      filterProdList ? item.fastDelivery === true : item
    );
  };

  const fastDeliveryList = fastDeliveryFilter(
    stockFilterList,
    state.fastDelivery
  );

  console.log(fastDeliveryList);

  // end of fast delivery

  // For sorting
  const sortData = (prodList, sortByList) => {
    if (sortByList === "LOW_TO_HIGH") {
      return [...prodList].sort((a, b) => a.price - b.price);
    }
    if (sortByList === "HIGH_TO_LOW") {
      return [...prodList].sort((a, b) => b.price - a.price);
    }
    return prodList;
  };

  const sortFinalList = sortData(fastDeliveryList, state.sortBy);
  console.log(sortFinalList);

  // End of Sorting

  // start of ratings

  const ratingFilter = (ratingList, ratingByList) => {
    if (ratingByList === "4STARSABOVE") {
      return [...ratingList].filter((item) => item.ratings >= 4);
    }
    if (ratingByList === "3STARSABOVE") {
      return [...ratingList].filter((item) => item.ratings >= 3);
    }
    if (ratingByList === "2STARSABOVE") {
      return [...ratingList].filter((item) => item.ratings >= 2);
    }
    if (ratingByList === "1STARSABOVE") {
      return [...ratingList].filter((item) => item.ratings >= 1);
    }
    return ratingList;
  };

  const ratingsFilterList = ratingFilter(sortFinalList, state.ratings);

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
        onClick={(e) => dispatch({ type: "SORT_BY", payload: "HIGH_TO_LOW" })}
        type="radio"
      />
      <label> High to low </label>

      <input
        value="LOW_TO_HIGH"
        name="toggle"
        onClick={(e) => dispatch({ type: "SORT_BY", payload: "LOW_TO_HIGH" })}
        type="radio"
      />
      <label> low to high </label>

      <hr />

      <input
        onClick={(e) => dispatch({ type: "RATINGS", payload: "4STARSABOVE" })}
        type="radio"
        name="toggle2"
      />
      <label> 4 Stars and above </label>

      <input
        onClick={(e) => dispatch({ type: "RATINGS", payload: "3STARSABOVE" })}
        type="radio"
        name="toggle2"
      />
      <label> 3 Stars and above </label>

      <input
        onClick={(e) => dispatch({ type: "RATINGS", payload: "2STARSABOVE" })}
        type="radio"
        name="toggle2"
      />
      <label> 2 Stars and above </label>

      <input
        onClick={(e) => dispatch({ type: "RATINGS", payload: "1STARSABOVE" })}
        type="radio"
        name="toggle2"
      />
      <label> 1 Stars and above </label>

      <div className="App" style={{ display: "flex", flexWrap: "wrap" }}>
        {ratingsFilterList.map(
          ({
            id,
            name,
            image,
            price,
            productName,
            inStock,
            level,
            fastDelivery,
            ratings
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
              <div> {ratings} stars </div>
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
