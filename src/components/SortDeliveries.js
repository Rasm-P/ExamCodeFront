import React, { useState, useEffect } from "react";
import { catchHttpErrors } from "../utils";
import { Route, useRouteMatch, Link } from "react-router-dom";

const SortDeliveries = props => {
  const { EndpointFacade } = props;

  const inputfield = { input: "" };
  const [search, setSearch] = useState(inputfield);
  const [allDeliveries, setAllDeliveries] = useState([]);

  useEffect(() => {
    EndpointFacade.fetchAllDelivery()
      .then(data => setAllDeliveries(data))
      .catch(catchHttpErrors);
  }, []);

  const match = useRouteMatch();
  const lowercasedFilter = search.input.toLowerCase();
  const filteredData = allDeliveries.filter(item => {
    return Object.keys(item).some(key =>
      item[key]
        .toString()
        .toLowerCase()
        .includes(lowercasedFilter)
    );
  });

  const handleChange = event => {
    event.preventDefault();
    setSearch({ ...search, [event.target.id]: event.target.value });
  };

  return (
    <div className="col-sm-offset-3 col-sm-9">
      <h1>Search for Deliveries</h1>
      <p>Search the filter for Deliveries.</p>
      <form className="form-horizontal">
        <input
          onChange={handleChange}
          className="form-control"
          id="input"
          placeholder="Search by shipping date, from location, destination..."
        />
        {!(search.input === "") ? (
          <table className="table">
            <thead>
              <tr className="header">
                <th>Id</th>
                <th>Shipping Date</th>
                <th>From Location</th>
                <th>To Location</th>
              </tr>
            </thead>
            {filteredData && filteredData.length ? (
              <tbody>
                {filteredData.map(item => (
                  <tr key={item.id}>
                    <td>
                      <Link to={`${match.url}/${item.id}`}> {item.id} </Link>
                    </td>
                    <td>{item.shippingDate}</td>
                    <td>{item.fromLocation}</td>
                    <td>{item.toLocation}</td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <i>No results were found!</i>
            )}
          </table>
        ) : null}
      </form>
      <hr />
      <Route
        path={`${match.path}/:id`}
        render={({ match }) => (
          <DeliveryLink match={match} allDeliveries={allDeliveries} />
        )}
      />
    </div>
  );
};

const DeliveryLink = ({ match, allDeliveries }) => {
  const chosenDelivery = allDeliveries.find(x => {
    return x.id == match.params.id;
  });
  return (
    <div>
      {chosenDelivery != null ? (
        <div>
          <Link to={`/sortDeliveries`}>
            <h5>Information</h5>
          </Link>
          <table className="table">
            <thead>
              <tr>
                <th>Delivery</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <ul>
                    <li>{chosenDelivery.id}</li>
                    <li>{chosenDelivery.shippingDate}</li>
                    <li>{chosenDelivery.fromLocation}</li>
                    <li>{chosenDelivery.toLocation}</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
};

export default SortDeliveries;
