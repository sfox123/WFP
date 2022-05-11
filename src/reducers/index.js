import { combineReducers } from "redux";
import fetchReducer from "./fetchReducer";
import HistoryReducer from "./HistoryReducer";

const USER_STATE = {
  userName: null,
  passWord: null,
};

const PASS_STATE = {
  loggedIn: false,
  passError: false,
};

const SNACK = {
  snackOpen: false,
  snackMessage: null,
};

const userReducer = () => {
  return [
    { user: "MANJULA M", value: 10, password: "2134" },
    { user: "MUHUN N", value: 20, password: "2134" },
    { user: "SHAGAR T", value: 30, password: "2134" },
  ];
};
const loggedInReducer = (state = PASS_STATE, action) => {
  switch (action.type) {
    case "LOGGED":
      return { ...state, loggedIn: action.payload };
    case "PASS_ERROR":
      return { ...state, passError: action.payload };
    default:
      return state;
  }
};

const loggedUserReducer = (user = USER_STATE, action) => {
  switch (action.type) {
    case "USER_LOGGED":
      return { ...user, userName: action.payload };
    case "USER_LOGGED_PASS":
      return { ...user, passWord: action.payload };
    default:
      return user;
  }
};

const fetchBioMetricReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCH_BIO":
      return action.payload;
    default:
      return state;
  }
};

const loaderReducer = (state = false, action) => {
  switch (action.type) {
    case "TOGGLE_LOADER":
      return action.payload;
    default:
      return state;
  }
};

const snackReducer = (state = SNACK, action) => {
  switch (action.type) {
    case "SNACK_SWITCH":
      return action.payload;
    default:
      return state;
  }
};

const foundUserReducer = (state = null, action) => {
  switch (action.type) {
    case "FETCH_USER":
      return action.payload;

    default:
      return state;
  }
};

const alertReducer = (state = false, action) => {
  switch (action.type) {
    case "ALERT":
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  user: userReducer,
  currentUser: loggedUserReducer,
  fetchData: fetchReducer,
  loggedIn: loggedInReducer,
  bioMetric: fetchBioMetricReducer,
  loader: loaderReducer,
  openSnack: snackReducer,
  alertOpen: alertReducer,
  foundUser: foundUserReducer,
  history: HistoryReducer,
});
