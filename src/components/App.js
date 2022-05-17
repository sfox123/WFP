import React, { useEffect } from "react";

import Login from "./Login";
import User from "./User";
import Staff from "./views/Staff";

import Protected from "../routes/Protected";

import { BrowserRouter, Route, Redirect, Routes } from "react-router-dom";
import { connect } from "react-redux";
import { getHistory } from "../actions";
import Signature from "./views/Signature";

const App = ({ fetchHistory }) => {
  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <div>
          <Route exact path={"/"} component={Login} />
          <Route exact path={"/Login"} component={Login} />
          <Route exact path={"/:userId/details/:query"} component={Staff} />
          <Route exact path={"/:id/assign/:el"} component={Signature} />
          <Route exact path={"/mail/:id"} component={Signature} />
          <Route exact path={"/:id/creation"} component={Signature} />
          <Protected exact path={"/User"} component={User} />
        </div>
      </BrowserRouter>
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { fetchHistory: getHistory })(App);
