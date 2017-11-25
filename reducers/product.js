const _ = require("lodash");

export default function reducer(
  state = {
    products: [],
    fetchingProducts: false,
    fetchedProducts: false,
    error: null,
    category: "",
    applyPriceFilter: false,
    priceRange: [0, 50000]
  },
  action
) {
  switch (action.type) {
    case "FETCH_PRODUCTS_STARTED": {
      return { ...state, fetchingProducts: true };
      break;
    }
    case "FETCH_PRODUCTS_REJECTED": {
      return { ...state, fetchingProducts: false, error: action.payload };
      break;
    }
    case "FETCH_PRODUCTS_FULFILLED": {
      return {
        ...state,
        fetchedProducts: true,
        fetchingProducts: false,
        products: action.payload,
        error: null
      };
      break;
    }
    case "SET_PRICE_FILTER": {
      return {
        ...state,
        applyPriceFilter: action.payload
      };
      break;
    }
    case "SET_PRICE_RANGE": {
      return {
        ...state,
        priceRange: action.payload
      };
      break;
    }
    case "SET_CATEGORY": {
      return {
        ...state,
        category: action.payload
      };
      break;
    }
    default: {
      return state;
    }
  }
}
