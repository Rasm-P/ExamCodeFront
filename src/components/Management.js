import React, { useState, useEffect } from "react";
import { Route, Redirect, useRouteMatch, Link } from "react-router-dom";
import AddEditDeleteDriver from "./CRUDcomponents/AddEditDeleteDriver";
import AddEditDeleteTrucks from "./CRUDcomponents/AddEditDeleteTrucks";
import AddEditDeleteCargo from "./CRUDcomponents/AddEditDeleteCargo";
import AddEditDeleteDelivery from "./CRUDcomponents/AddEditDeleteDelivery";
import { catchHttpErrors } from "../utils";

const Management = props => {
  const { loggedIn, EndpointFacade } = props;

  const [isBlocking, setIsBlocking] = useState(false);
  const [update, setUpdate] = useState(false);
  const [allTrucks, setAllTrucks] = useState([]);
  const [allDrivers, setAllDrivers] = useState([]);
  const [allCargo, setAllCargo] = useState([]);
  const [allDeliveries, setAllDeliveries] = useState([]);

  useEffect(() => {
    setUpdate(false);
    EndpointFacade.fetchAllTrucks()
      .then(data => setAllTrucks(data))
      .catch(catchHttpErrors);
  }, [update]);

  useEffect(() => {
    EndpointFacade.fetchAllDriver()
      .then(data => setAllDrivers(data))
      .catch(catchHttpErrors);
  }, [update]);

  useEffect(() => {
    EndpointFacade.fetchAllCargo()
      .then(data => setAllCargo(data))
      .catch(catchHttpErrors);
  }, [update]);

  useEffect(() => {
    EndpointFacade.fetchAllDelivery()
      .then(data => setAllDeliveries(data))
      .catch(catchHttpErrors);
  }, [update]);

  const match = useRouteMatch();

  return (
    <div className="col-sm-offset-3 col-sm-9">
      {loggedIn ? (
        <div>
          <h1>Management Page</h1>
          <ul>
            <li>
              <Link to={`${match.url}/addEditDeleteDriver`}>
                {" "}
                Add/Edit/Delete Drivers{" "}
              </Link>
            </li>
            <li>
              <Link to={`${match.url}/addEditDeleteTrucks`}>
                {" "}
                Add/Edit/Delete Trucks{" "}
              </Link>
            </li>
            <li>
              <Link to={`${match.url}/addEditDeleteCargo`}>
                {" "}
                Add/Edit/Delete Cargo{" "}
              </Link>
            </li>
            <li>
              <Link to={`${match.url}/addEditDeleteDelivery`}>
                {" "}
                Add/Edit/Delete Deliveries{" "}
              </Link>
            </li>
          </ul>
          <Route
            path={`${match.path}/addEditDeleteDriver`}
            render={() => (
              <AddEditDeleteDriver
                isBlocking={isBlocking}
                setIsBlocking={setIsBlocking}
                EndpointFacade={EndpointFacade}
                catchHttpErrors={catchHttpErrors}
                setUpdate={setUpdate}
                allDrivers={allDrivers}
              />
            )}
          />
          <Route
            path={`${match.path}/addEditDeleteTrucks`}
            render={() => (
              <AddEditDeleteTrucks
                isBlocking={isBlocking}
                setIsBlocking={setIsBlocking}
                EndpointFacade={EndpointFacade}
                catchHttpErrors={catchHttpErrors}
                setUpdate={setUpdate}
                allTrucks={allTrucks}
              />
            )}
          />
          <Route
            path={`${match.path}/addEditDeleteCargo`}
            render={() => (
              <AddEditDeleteCargo
                isBlocking={isBlocking}
                setIsBlocking={setIsBlocking}
                EndpointFacade={EndpointFacade}
                catchHttpErrors={catchHttpErrors}
                setUpdate={setUpdate}
                allCargo={allCargo}
              />
            )}
          />
          <Route
            path={`${match.path}/addEditDeleteDelivery`}
            render={() => (
              <AddEditDeleteDelivery
                isBlocking={isBlocking}
                setIsBlocking={setIsBlocking}
                EndpointFacade={EndpointFacade}
                catchHttpErrors={catchHttpErrors}
                setUpdate={setUpdate}
                allDeliveries={allDeliveries}
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
