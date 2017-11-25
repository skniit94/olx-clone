import axios from "axios";
import { connect } from "react-redux";

export function fetchAds() {
  console.log("FETCH_ADS");
  return {
    type: "FETCH_ADS"
  };
}
