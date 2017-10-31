import axios from "axios";
import { connect } from "react-redux";

export function fetchProducts() {
  console.log("FETCH_PRODUCTS");
  return {
    type: "FETCH_PRODUCTS"
  };
}

export function togglePriceFilter(bool) {
  console.log("SET_PRICE_FILTER");
  return {
    type: "SET_PRICE_FILTER",
    payload: bool
  };
}

export function setPriceRange(values) {
  console.log("SET_PRICE_RANGE");
  return {
    type: "SET_PRICE_RANGE",
    payload: values
  };
}

export function setCategory(category) {
  console.log("SET_CATEGORY");
  return {
    type: "SET_CATEGORY",
    payload: category
  };
}
