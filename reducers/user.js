const _ = require("lodash");

export default function reducer(
  state = {
    users: [],
    fetchingUsers: false,
    fetchedUsers: false,
    error: null
  },
  action
) {
  switch (action.type) {
    case "FETCH_USERS_STARTED": {
      return { ...state, fetchingUsers: true };
      break;
    }
    case "FETCH_USERS_REJECTED": {
      return { ...state, fetchingUsers: false, error: action.payload };
      break;
    }
    case "FETCH_USERS_FULFILLED": {
      //   var sortedUsers = _.orderBy(action.payload, ["time"], ["desc"]);
      return {
        ...state,
        fetchedUsers: true,
        fetchingUsers: false,
        users: action.payload,
        error: null
      };
      break;
    }
    default: {
      return state;
    }
  }
}
