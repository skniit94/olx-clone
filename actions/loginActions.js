import axios from "axios";
import { connect } from "react-redux";

export function authenticateUser(username, password) {
  console.log("AUTHENTICATE_USER", username, password);
  return {
    type: "AUTHENTICATE_USER",
    payload: [username, password]
  };
}

export function addUsers(username, password) {
  console.log("abcd");
  return {
    type: "ADD_USER",
    payload: [username, password]
  };
}
