import "./App.scss";
import Navbar from "./Navbar/Navbar";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Register from "./Register/Register";
import {NewThread} from "./Thread/NewThread"
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { React, useState, useEffect } from "react";

const axios = require("axios");
const loginServiceDetails = "http://localhost:4000";

function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .post(loginServiceDetails + "/isLoggedIn")
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          let { userId, firstName, lastName, email, dateOfBirth } = response.data;
          console.log(response.data);
          setUser((user) => ({
            userId: userId,
            firstName: firstName,
            lastName: lastName,
            email: email,
            dateOfBirth: dateOfBirth,
          }));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Router>
      <Navbar user={user} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact  path="/newpost">
          <NewThread user={user}/>
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>

        <Route exact path="/register">
          <Register />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
