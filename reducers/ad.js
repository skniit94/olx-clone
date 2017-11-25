const _ = require("lodash");

export default function reducer(
  state = {
    ads: [],
    fetchingAds: false,
    fetchedAds: false,
    error: null
  },
  action
) {
  switch (action.type) {
    case "FETCH_ADS_STARTED": {
      return { ...state, fetchingAds: true };
      break;
    }
    case "FETCH_ADS_REJECTED": {
      return { ...state, fetchingAds: false, error: action.payload };
      break;
    }
    case "FETCH_ADS_FULFILLED": {
      return {
        ...state,
        fetchedAds: true,
        fetchingAds: false,
        ads: action.payload,
        error: null
      };
      break;
    }
    default: {
      return state;
    }
  }
}
