import React from "react";
import { Redirect } from "react-router-dom";

const Logout = props => {
  const { apiFacade, loggedIn, setLoggedIn } = props;

  const logout = () => {
    apiFacade.logout();
    setLoggedIn(false);
  };
  return (
    <div className="col-sm-offset-3 col-sm-9">
      {loggedIn ? (
        <LoggedIn apiFacade={apiFacade} logout={logout} />
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
};

export default Logout;

const LoggedIn = ({ apiFacade, logout }) => {
  const role = apiFacade.tokenDecoder().roles;
  const username = apiFacade.tokenDecoder().username;

  return (
    <div>
      <h2>You are logged in as:</h2>
      <h4>Role: {role}</h4>
      <h4>Username: {username}</h4>
      <button onClick={logout} className="btn btn-primary">
        Logout
      </button>
    </div>
  );
};
