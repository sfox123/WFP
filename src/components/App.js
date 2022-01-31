import React from "react";
import Login from "./Login";
import Nav from "./Nav";
import User from "./User";
import Protected from "../routes/Protected";

import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const App = ({ loggedIn }) => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Nav />
          <Route exact path={"/Login"} component={Login} />
          <Protected exact path={"/User"} component={User} />
        </div>
      </BrowserRouter>
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(App);
