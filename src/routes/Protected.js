import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import { fetchUser } from "../actions";

const Protected = ({
  component: Component,
  logged,
  loggedUser,
  fetchClient,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (logged) {
          return <Component {...props} />;
        } else if (loggedUser) {
          fetchClient();
        } else {
          <Redirect to="/Login" />;
        }
      }}
    />
  );
};

const mapStateToProps = (state) => {
  const loggedUser = window.localStorage.getItem("loggedUser") === "true";
  return { logged: state.loggedIn.loggedIn, loggedUser };
};

export default connect(mapStateToProps, { fetchClient: fetchUser })(Protected);
