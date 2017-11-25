import { put, takeEvery, all, call } from "redux-saga/effects";
import axios from "axios";
import faker from "faker";
import * as firebase from "firebase";

const auth_token = "PUPFRGrEmG6TKijv6dXYiTiJEOgzqQ0vYfeKZDvr";

const rootSaga = function* rootSaga() {
  console.log("into root saga");
  yield all([watchFetchproducts(), watchFetchusers(), watchFetchads()]);
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
  // return axios.get("http://localhost:3000/data").then(response => {
  //   console.log(response);
  //   return response.data;
  // });
  return axios
    .get(
      "https://myproject-42420.firebaseio.com/products.json?auth=" + auth_token
    )
    .then(response => {
      console.log(response);
      return response.data;
    });
};

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
  // return axios.get("http://localhost:3000/user").then(response => {
  //   console.log(response);
  //   return response.data;
  // });
  return axios
    .get("https://myproject-42420.firebaseio.com/users.json?auth=" + auth_token)
    .then(response => {
      console.log(response);
      return response.data;
    });
  // return firebase
  //   .database()
  //   .ref("/users/")
  //   .once("value")
  //   .then(function(snapshot) {
  //     // const username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
  //     const response = snapshot.val();
  //     console.log("snapshot", response);
  //     return response;
  //   });
};

// fetchUsers

// fetchAds

const fetchAds = function* fetchAds() {
  console.log("into fetch Ads saga");
  yield put({ type: "FETCH_ADS_STARTED" });
  try {
    const ads = yield call(fetchadData);
    yield put({ type: "FETCH_ADS_FULFILLED", payload: ads });
  } catch (error) {
    yield put({ type: "FETCH_ADS_REJECTED", payload: error });
  }
};

const watchFetchads = function* watchFetchads() {
  yield takeEvery("FETCH_ADS", fetchAds);
};

const fetchadData = () => {
  return axios
    .get("https://myproject-42420.firebaseio.com/ads.json?auth=" + auth_token)
    .then(response => {
      console.log(response);
      return response.data;
    });
};

// fetchAds

export default rootSaga;
