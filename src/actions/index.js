import axios from "../api/axios";
import { createMail } from './mail';
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
  } catch (error) { }
};

export const fetchApi = () => async (dispatch, getState) => {
  const userData = getState().currentUser;
  try {
    dispatch(toggleLoader(true));
    const response = await axios.post("/wfp/login", { userData });
    await dispatch({ type: "FETCH_API", payload: response.data });
    await dispatch(loggedIn(true));
    window.localStorage.setItem("loggedUser", true);
    window.localStorage.setItem("id", response.data._id);
    window.location.href = "/User";
  } catch (error) {
    const SNACK = {
      snackOpen: true,
      snackMessage: "Incorrect Password !",
      severity: false,
    };
    dispatch(toggleSnack(SNACK));
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
        severity: true,
      };
      dispatch(toggleLoader(false));
      dispatch(toggleSnack(SNACK));
    }
  } catch (error) {
    alert(error);
  }
};
export const createUserMail = (state) => async (dispatch, getState) => {
  try {
    dispatch(toggleLoader(true));
    const { userName, userUnit } = state;
    const response = await axios.post("/wfp/getMail", {
      userName,
      userUnit,
    });
    if (response.status === 200) {
      const SNACK = {
        snackOpen: true,
        snackMessage: 'Downloading Mail .. !',
        severity: true,
      };
      dispatch(toggleLoader(false));
      dispatch(toggleSnack(SNACK));
      createMail(response.data)
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

export const matchScore = (itemName) => async (dispatch, getState) => {
  await dispatch(toggleLoader(true));
  const response = await axios.post("https://localhost:8443/SGIFPCapture");
  const bioMetricList = await axios.post("/wfp/getFp");
  dispatch({ type: "FETCH_USER", payload: bioMetricList.data });
  console.log(bioMetricList.data)
  dispatch(
    getMatch(bioMetricList.data, response.data.TemplateBase64, itemName)
  );
};



const getMatch =
  (state = [], bmOne, itemName) =>
    async (dispatch, getState) => {
      try {
        var secugen_lic = "hE/78I5oOUJnm5fa5zDDRrEJb5tdqU71AVe+/Jc2RK05";
        var uri = "https://localhost:8443/SGIMatchScore";
        var xmlhttp = new XMLHttpRequest();
        let userId = "";
        let tmpArr = [...state];
        let index = {};
        let assignedBy = getState().fetchData.name;
        let run = true;
        xmlhttp.onreadystatechange = async function () {
          if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var fpobject = JSON.parse(xmlhttp.responseText);
            if (fpobject.MatchingScore >= 50) {
              console.log(fpobject)
              run = false;
              const response = await axios.post("/wfp/postHistory", {
                userId,
                assignedBy,
                itemName,
              });
              const res = await axios.post("/algolia");
              const SNACK = {
                snackOpen: true,
                snackMessage: response.data,
                severity: true,
              };
              dispatch(toggleLoader(false));
              dispatch(toggleSnack(SNACK));
            } else {
              tmpArr.splice(tmpArr.indexOf(index), 1);
              if (tmpArr.length === 0) {
                run = false
                const SNACK = {
                  snackOpen: true,
                  snackMessage: "User Not Found",
                  severity: false,
                };
                dispatch(toggleLoader(false));
                dispatch(toggleSnack(SNACK));
              }
            }
          }
        };
        state.map((x, i) => {
          if (run) {
            const params =
              "template1=" +
              encodeURIComponent(bmOne) +
              "&template2=" +
              encodeURIComponent(state[i].biometric) +
              "&licstr=" +
              "&templateFormat=ISO";
            userId = state[i].name;
            index = x;
            xmlhttp.open("POST", uri, false);
            xmlhttp.send(params);
          }
        });
      } catch (error) {
        const SNACK = {
          snackOpen: true,
          snackMessage: "User Not Found",
          severity: false,
        };
        dispatch(toggleLoader(false));
        dispatch(toggleSnack(SNACK));
      }
    };

export const getHistory = () => async (dispatch, getState) => {
  const response = await axios.get("/wfp/getHistory");
  dispatch({ type: "FETCH_HISTORY", payload: response.data });
};

export const setHistory = (arr) => async (dispatch, getState) => {
  dispatch({ type: "FETCH_HISTORY", payload: arr });
};

export const changePass = (newPass) => async (dispatch, getState) => {
  const id = getState().fetchData._id;
  const response = await axios.post("/wfp/changePass", { id, newPass });
  const SNACK = {
    snackOpen: true,
    snackMessage: response.data,
    severity: true,
  };
  dispatch(toggleSnack(SNACK));
};

export const updateHistory = (list, author) => async (dispatch, getState) => {
  dispatch(toggleLoader(true));
  const response = await axios.post("/wfp/updateHistory", { list, author });

  const SNACK = {
    snackOpen: true,
    snackMessage: response.data,
    severity: true,
  };
  dispatch(toggleSnack(SNACK));
  dispatch(toggleLoader(false));
};

export const handleAlert = (state) => {
  return {
    type: "ALERT",
    payload: state,
  };
};
