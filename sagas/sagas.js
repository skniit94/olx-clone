import { put, takeEvery, all, call } from "redux-saga/effects";
import axios from "axios";
import faker from "faker";

const rootSaga = function* rootSaga() {
  console.log("into root saga");
  yield all([watchFetchproducts(), watchFetchusers()]);
};

// fetchProducts

const fetchProducts = function* fetchProducts() {
  console.log("into fetch Products saga");
  yield put({ type: "FETCH_PRODUCTS_STARTED" });
  try {
    const products = yield call(fetchproductData);
    yield put({ type: "FETCH_PRODUCTS_FULFILLED", payload: products });
  } catch (error) {
    yield put({ type: "FETCH_PRODUCTS_REJECTED", payload: error });
  }
};

const watchFetchproducts = function* watchFetchproducts() {
  yield takeEvery("FETCH_PRODUCTS", fetchProducts);
};

const fetchproductData = () => {
  return axios.get("http://localhost:3000/data").then(response => {
    console.log(response);
    return response.data;
  });
};

// fetchUsers

// fetchUsers

const fetchUsers = function* fetchUsers() {
  console.log("into fetch Users saga");
  yield put({ type: "FETCH_USERS_STARTED" });
  try {
    const users = yield call(fetchuserData);
    yield put({ type: "FETCH_USERS_FULFILLED", payload: users });
  } catch (error) {
    yield put({ type: "FETCH_USERS_REJECTED", payload: error });
  }
};

const watchFetchusers = function* watchFetchusers() {
  yield takeEvery("FETCH_USERS", fetchUsers);
};

const fetchuserData = () => {
  return axios.get("http://localhost:3000/user").then(response => {
    console.log(response);
    return response.data;
  });
};

// fetchUsers

export default rootSaga;
