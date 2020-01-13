import React, { useState } from "react";
import { catchHttpErrors } from "../utils";

const TruckDriverBooking = props => {
  const { EndpointFacade } = props;

  const inputfield = { input: "" };
  const [search, setSearch] = useState(inputfield);
  const [filteredData, setFilteredData] = useState([]);

  const handleDriverSubmit = event => {
    event.preventDefault();
    EndpointFacade.fetchAllDriversByDate(search.input.toLowerCase())
      .then(data => setFilteredData(data))
      .catch(catchHttpErrors);
    event.target.reset();
  };

  const handleTruckSubmit = event => {
    event.preventDefault();
    EndpointFacade.fetchAllTrucksByDate(search.input.toLowerCase())
      .then(data => setFilteredData(data))
      .catch(catchHttpErrors);
    event.target.reset();
  };

  const handleChange = event => {
    event.preventDefault();
    setSearch({ ...search, [event.target.id]: event.target.value });
    setFilteredData([]);
  };

  return (
    <div className="col-sm-offset-3 col-sm-9">
      <h1>Truck and Driver booking</h1>
      <form
        className="form-horizontal"
        onChange={handleChange}
        onSubmit={handleDriverSubmit}
      >
        <h5>Drivers</h5>
        <input
          className="form-control"
          id="input"
          placeholder="Search by date 'YYYY-MM-DD'"
        />
        <button type="submit" className="btn btn-primary">
          Get Drivers
        </button>
      </form>
      <hr />
      <form
        className="form-horizontal"
        onChange={handleChange}
        onSubmit={handleTruckSubmit}
      >
        <h5>Trucks</h5>
        <input
          className="form-control"
          id="input"
          placeholder="Search by date 'YYYY-MM-DD'"
        />
        <button type="submit" className="btn btn-primary">
          Get Trucks
        </button>
      </form>

      {filteredData && filteredData.length && search.input !== "" ? (
        <div>
          <hr />
          <h5>Booked</h5>
          <table className="table">
            <thead>
              <tr className="header">
                <th>Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>Booked!</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
};

export default TruckDriverBooking;
