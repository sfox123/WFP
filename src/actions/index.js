import axios from "../api/axios";

// action creator
export const loggedUser = (user) => {
  //return an action
  return {
    type: "USER_LOGGED",
    payload: user,
  };
};

export const toggleSnack = (state) => {
  return {
    type: "SNACK_SWITCH",
    payload: state,
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
    await dispatch({
      type: "FETCH_BIO",
      payload: response.data.TemplateBase64,
    });
  } catch (error) {
    dispatch(passError(true));
    console.log(error);
  }
};
export const createUser = (state) => async (dispatch, getState) => {
  try {
    await dispatch(fetchBio());
    const { userName, userUnit } = state;
    const bioMetric = getState().bioMetric;

    const response = await axios.post("/wfp/getBioMetric", {
      userName,
      userUnit,
      bioMetric,
    });
    if (response.status === 200) {
      const SNACK = {
        snackOpen: true,
        snackMessage: response.data,
      };
      dispatch(toggleLoader(false));
      dispatch(toggleSnack(SNACK));
    }
  } catch (error) {
    alert(error);
  }
};
export const toggleLoader = (state) => {
  return {
    type: "TOGGLE_LOADER",
    payload: state,
  };
};

export const matchScore = (itemName, remarks) => async (dispatch, getState) => {
  await dispatch(toggleLoader(true));
  const response = await axios.post("https://localhost:8443/SGIFPCapture");

  const bioMetricList = await axios.post("/wfp/getFp");
  dispatch({ type: "FETCH_USER", payload: bioMetricList.data });
  dispatch(
    getMatch(
      bioMetricList.data,
      response.data.TemplateBase64,
      itemName,
      remarks
    )
  );
};

const getMatch =
  (state = [], bmOne, itemName, remarks) =>
  async (dispatch, getState) => {
    var uri = "https://localhost:8443/SGIMatchScore";
    var xmlhttp = new XMLHttpRequest();
    let userId = "";
    let assignedBy = getState().fetchData.name;

    xmlhttp.onreadystatechange = async function () {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var fpobject = JSON.parse(xmlhttp.responseText);
        if (fpobject.MatchingScore >= 50) {
          const response = await axios.post("/wfp/postHistory", {
            userId,
            assignedBy,
            itemName,
            remarks,
          });
          const SNACK = {
            snackOpen: true,
            snackMessage: response.data,
          };
          dispatch(toggleLoader(false));
          dispatch(toggleSnack(SNACK));
        }
      }
    };
    state.map(async (x, i) => {
      const params =
        "template1=" +
        encodeURIComponent(bmOne) +
        "&template2=" +
        encodeURIComponent(state[i].biometric) +
        "&licstr=" +
        "&templateFormat=ISO";
      userId = state[i].name;
      xmlhttp.open("POST", uri, false);
      xmlhttp.send(params);
    });
    dispatch(getHistory());
  };

export const getHistory = () => async (dispatch, getState) => {
  const response = await axios.get("/wfp/getHistory");
  dispatch({ type: "FETCH_HISTORY", payload: response.data });
};

export const updateHistory = (list, author) => async (dispatch, getState) => {
  dispatch(toggleLoader(true));
  const response = await axios.post("/wfp/updateHistory", { list, author });

  const SNACK = {
    snackOpen: true,
    snackMessage: response.data,
  };
  dispatch(getHistory());
  dispatch(toggleSnack(SNACK));
};
