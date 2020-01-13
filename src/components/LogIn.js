import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { catchHttpErrors } from "../utils";

const LogIn = props => {
  const { apiFacade, loggedIn, setLoggedIn } = props;

  const login = (user, pass) => {
    apiFacade
      .login(user, pass)
      .then(res => setLoggedIn(true))
      .catch(err => {
        console.log(err);
        err.fullError.then(function(result) {
          alert(result.message);
        });
        catchHttpErrors(err);
      });
  };
  return (
    <div className="col-sm-offset-3 col-sm-9">
      {!loggedIn ? <LogInForm login={login} /> : <Redirect to="/logout" />}
    </div>
  );
};

export default LogIn;

const LogInForm = ({ login }) => {
  const emptyUser = { username: "", password: "" };
  const [user, setUser] = useState(emptyUser);

  const handleChange = event => {
    event.preventDefault();
    setUser({ ...user, [event.target.id]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log("Submission..");
    login(user.username, user.password);
  };

  return (
    <div>
      <h2>Login</h2>
      <form
        className="form-horizontal"
        onSubmit={handleSubmit}
        onChange={handleChange}
      >
        <div className="form-group">
          <div className="col-sm-9">
            <input
              className="form-control"
              placeholder="User Name"
              id="username"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-9">
            <input
              className="form-control"
              placeholder="Password"
              id="password"
              type="password"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-3 col-sm-9">
            <button className="btn btn-primary">Login</button>
          </div>
        </div>
      </form>
    </div>
  );
};
