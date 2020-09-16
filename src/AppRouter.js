import React, { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "./routes/Auth";
import Home from "./routes/Home";

// isLoggedIn 상태만 내려주면 된다.
function AppRouter({ isLoggedIn }) {
  return (
    <Router>
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home />
            </Route>
          </>
        ) : (
          <Route exact path="/">
            <Auth />
          </Route>
        )}
      </Switch>
    </Router>
  );
}

export default AppRouter;
