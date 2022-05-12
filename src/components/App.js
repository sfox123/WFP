import React, { useEffect } from "react";
import Login from "./Login";
import User from "./User";
import Staff from "./views/Staff";

import Protected from "../routes/Protected";

import { BrowserRouter, Route, Redirect, Routes } from "react-router-dom";
import { connect } from "react-redux";
import { getHistory } from "../actions";

const App = ({ fetchHistory }) => {
  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <div>
          <Route exact path={"/Login"} component={Login} />
          {/* <Route path={"/:userId/details/"} component={Staff} /> */}
          <Route path={"/:userId/details/:query"} component={Staff} />
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
