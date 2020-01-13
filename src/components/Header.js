import React from "react";
import { NavLink } from "react-router-dom";

const Header = props => {
  const { loginFacade, loggedIn } = props;

  const roleHeaders =
    loggedIn && loginFacade.tokenDecoder().roles === "admin" ? (
      <li>
        <NavLink activeClassName="active" to="/adminpage">
          Admin Page
        </NavLink>
      </li>
    ) : null;

  const loginHeaders = loggedIn ? (
    <li>
      <NavLink activeClassName="active" to="/logout">
        Log Out
      </NavLink>
    </li>
  ) : (
    <li>
      <NavLink activeClassName="active" to="/login">
        Log In
      </NavLink>
    </li>
  );

  return (
    <ul className="header">
      <li>
        <NavLink exact activeClassName="active" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/searchforpersons">
          Search for Persons
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/searchbyhobby">
          Search by Hobby
        </NavLink>
      </li>
      {roleHeaders}
      {loginHeaders}
    </ul>
  );
};

export default Header;
