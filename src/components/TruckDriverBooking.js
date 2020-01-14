import React, { useState, useEffect } from "react";
import { catchHttpErrors } from "../utils";

const TruckDriverBooking = props => {
  const { EndpointFacade } = props;

  const inputfield = { input: "" };
  const [searchDriver, setSearchDriver] = useState(inputfield);
  const [searchTruck, setSearchTruck] = useState(inputfield);
  const [filteredDataDriver, setFilteredDataDriver] = useState([]);
  const [filteredDataTruck, setFilteredDataTruck] = useState([]);
  const [allDrivers, setAllDrivers] = useState([]);
  const [allTrucks, setAllTrucks] = useState([]);

  useEffect(() => {
    EndpointFacade.fetchAllTrucks()
      .then(data => setAllTrucks(data))
      .catch(catchHttpErrors);
  }, []);

  useEffect(() => {
    EndpointFacade.fetchAllDriver()
      .then(data => setAllDrivers(data))
      .catch(catchHttpErrors);
  }, []);

  const handleDriverSubmit = event => {
    event.preventDefault();
    EndpointFacade.fetchAllDriversByDate(searchDriver.input.toLowerCase())
      .then(data => setFilteredDataDriver(data))
      .catch(catchHttpErrors);
    event.target.reset();
  };

  const handleTruckSubmit = event => {
    event.preventDefault();
    EndpointFacade.fetchAllTrucksByDate(searchTruck.input.toLowerCase())
      .then(data => setFilteredDataTruck(data))
      .catch(catchHttpErrors);
    event.target.reset();
  };

  const handleChangeDriver = event => {
    event.preventDefault();
    setSearchDriver({ ...searchDriver, [event.target.id]: event.target.value });
    setFilteredDataDriver([]);
  };

  const handleChangeTruck = event => {
    event.preventDefault();
    setSearchTruck({ ...searchTruck, [event.target.id]: event.target.value });
    setFilteredDataTruck([]);
  };

  return (
    <div className="col-sm-offset-3 col-sm-9">
      <h1>Truck and Driver booking</h1>
      <p>Search for a specific date to see if trucks or drivers are booked.</p>
      <form
        className="form-horizontal"
        onChange={handleChangeDriver}
        onSubmit={handleDriverSubmit}
      >
        <h5>Drivers</h5>
        <input
          className="form-control"
          id="input"
          placeholder="Search for Driver by date 'YYYY-MM-DD'"
        />
        <button type="submit" className="btn btn-primary">
          Get Drivers
        </button>
      </form>
      <div>
        {filteredDataDriver &&
        filteredDataDriver.length &&
        searchDriver.input !== "" ? (
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
                {filteredDataDriver.map(item => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>Booked!</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
        {searchDriver.input !== "" ? (
          <div>
            <br />
            <h5>All Persons</h5>
            <table className="table">
              <thead>
                <tr className="header">
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {allDrivers.map(item => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
      <hr />
      <form
        className="form-horizontal"
        onChange={handleChangeTruck}
        onSubmit={handleTruckSubmit}
      >
        <h5>Trucks</h5>
        <input
          className="form-control"
          id="input"
          placeholder="Search for Truck by date 'YYYY-MM-DD'"
        />
        <button type="submit" className="btn btn-primary">
          Get Trucks
        </button>
      </form>
      <div>
        {filteredDataTruck &&
        filteredDataTruck.length &&
        searchTruck.input !== "" ? (
          <div>
            <hr />
            <h5>Booked</h5>
            <table className="table">
              <thead>
                <tr className="header">
                  <th>Name</th>
                  <th>Capacity</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredDataTruck.map(item => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.capacity}</td>
                    <td>Booked!</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
        {searchTruck.input !== "" ? (
          <div>
            <br />
            <h5>All Trucks</h5>
            <table className="table">
              <thead>
                <tr className="header">
                  <th>Name</th>
                  <th>Capacity</th>
                </tr>
              </thead>
              <tbody>
                {allTrucks.map(item => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.capacity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TruckDriverBooking;
