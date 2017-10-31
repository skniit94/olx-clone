import axios from "axios";
import { connect } from "react-redux";

export function fetchUsers() {
  console.log("abcd");
  return {
    type: "FETCH_USERS"
  };
}
