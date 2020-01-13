import React from "react";
import { NavLink } from "react-router-dom";

const Header = props => {
  const { loginFacade, loggedIn } = props;

  const roleHeader1 =
  loggedIn && loginFacade.tokenDecoder().roles === "admin" ? (
    <li>
      <NavLink activeClassName="active" to="/sortDeliveries">
      Sort Deliveries
      </NavLink>
    </li>
  ) : null;

  const roleHeader2 =
    loggedIn && loginFacade.tokenDecoder().roles === "admin" ? (
      <li>
        <NavLink activeClassName="active" to="/management">
          Management
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
        <NavLink activeClassName="active" to="/truckDriverBooking">
        Truck and Driver Booking
        </NavLink>
      </li>
      {roleHeader1}
      {roleHeader2}
      {loginHeaders}
    </ul>
  );
};

export default Header;
