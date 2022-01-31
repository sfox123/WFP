import axios from "../api/axios";

// action creator
export const loggedUser = (user) => {
  //return an action
  return {
    type: "USER_LOGGED",
    payload: user,
  };
};
export const loggedUserPass = (pass, getState) => {
  //return an action

  return {
    type: "USER_LOGGED_PASS",
    payload: pass,
  };
};

export const loggedIn = (state) => {
  return {
    type: "LOGGED",
    payload: state,
  };
};
export const passError = (state) => {
  return {
    type: "PASS_ERROR",
    payload: state,
  };
};

export const fetchUser = () => async (dispatch, getState) => {
  try {
    const id = window.localStorage.getItem("id");
    const response = await axios.post("/wfp/getUser", { id });
    await dispatch({ type: "FETCH_API", payload: response.data });
    await dispatch(loggedIn(true));
    dispatch({ type: "" });
  } catch (error) {}
};

export const fetchApi = () => async (dispatch, getState) => {
  const userData = getState().currentUser;
  try {
    const response = await axios.post("/wfp/login", { userData });
    await dispatch({ type: "FETCH_API", payload: response.data });
    await dispatch(loggedIn(true));
    window.localStorage.setItem("loggedUser", true);
    window.localStorage.setItem("id", response.data._id);
    window.location.href = "/User";
  } catch (error) {
    dispatch(passError(true));
    console.log(error);
  }
};

export const fetchBio = () => async (dispatch, getState) => {
  try {
    const response = await axios.post("https://localhost:8443/SGIFPCapture");
    dispatch({ type: "FETCH_BIO", payload: response.data });
  } catch (error) {
    dispatch(passError(true));
    console.log(error);
  }
};
