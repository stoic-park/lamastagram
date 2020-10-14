import React, { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "./routes/Auth";
import Home from "./routes/Home";
import Profile from "./routes/Profile";

// isLoggedIn 상태만 내려주면 된다.
function AppRouter({ user, setIsLoggedIn, isLoggedIn }) {
  return (
    <Router>
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home user={user} setIsLoggedIn={setIsLoggedIn} />
            </Route>
            <Route path="/profile">
              <Profile user={user} setIsLoggedIn={setIsLoggedIn} />
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
