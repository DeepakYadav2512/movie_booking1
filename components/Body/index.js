import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Movies from "../Movies";
import Theatre from "../Theatre";
import Login from "../Login";
import Register from "../Register";
import BookMovie from "../BookMovie";
import NavBar from "../NavBar";

const Body = (props) => {
  const [user, setUser] = useState({});

  return (
    <div style={{ height: "700px" }}>
      <BrowserRouter>
        <Route path="/" render={(props) => <NavBar {...props} user={user} />} />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <Login setUser={setUser} />}
          />
          <Route
            exact
            path="/movies"
            render={(props) => <Movies {...props} user={user} />}
          />
          <Route
            exact
            path="/register"
            render={(props) => <Register {...props} user={user} />}
          />
          <Route
            exact
            path="/theatres"
            render={(props) => <Theatre {...props} user={user} />}
          />
          <Route
            exact
            path="/bookmovies/:Movie_id"
            render={(props) => <BookMovie {...props} user={user} />}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Body;
