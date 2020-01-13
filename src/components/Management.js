import React, { useState } from "react";
import { Route, Redirect, Router, useRouteMatch, Link } from "react-router-dom";
import AddEditDeleteDriver from "./CRUDcomponents/AddEditDeleteDriver";
import { catchHttpErrors } from "../utils";

const Management = props => {
  const { loggedIn, EndpointFacade } = props;
  const match = useRouteMatch();
  const [isBlocking, setIsBlocking] = useState(false);
  return (
    <div className="col-sm-offset-3 col-sm-9">
      {loggedIn ? (
        <div>
          <h1>Management Page</h1>
          <ul>
            <li>
              <Link to={`${match.url}/addEditDeleteDriver`}> Add </Link>
            </li>
          </ul>
          <Route
            path={`${match.path}/:id`}
            render={() => (
              <AddEditDeleteDriver
                isBlocking={isBlocking}
                setIsBlocking={setIsBlocking}
                EndpointFacade={EndpointFacade}
                catchHttpErrors={catchHttpErrors}
              />
            )}
          />
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
};

export default Management;
