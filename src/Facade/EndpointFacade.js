import { handleHttpErrors, makeOptions } from "../utils";
import configuration from "../settings";

const URL = configuration.URL;

const endpointFacade = () => {
  function fetchUserInfo(role) {
    const options = makeOptions("GET", true);
    const us = fetch(configuration.URL + "/api/info/" + role, options).then(
      handleHttpErrors
    );
    return us;
  }

  function deleteCargo(id) {
    const options = makeOptions("DELETE", true);
    return fetch(URL + "/api/cargo/" + id, options).then(handleHttpErrors);
  }

  function fetchAllCargo() {
    const options = makeOptions("GET", true);
    const us = fetch(configuration.URL + "/api/cargo/allCargo", options).then(
      handleHttpErrors
    );
    return us;
  }

  function addEditCargoy(cargo) {
    let fetchUrl = URL + "/api/cargo";
    if (typeof cargo.id === "undefined") {
      const options = makeOptions("POST", true, cargo);
      return fetch(fetchUrl, options).then(handleHttpErrors);
    } else {
      const options = makeOptions("PUT", true, cargo);
      return fetch(fetchUrl, options).then(handleHttpErrors);
    }
  }

  function deleteDelivery(id) {
    const options = makeOptions("DELETE", true);
    return fetch(URL + "/api/delivery/" + id, options).then(handleHttpErrors);
  }

  function addEditDelivery(delivery) {
    let fetchUrl = URL + "/api/delivery";
    if (typeof delivery.id === "undefined") {
      const options = makeOptions("POST", true, delivery);
      return fetch(fetchUrl, options).then(handleHttpErrors);
    } else {
      const options = makeOptions("PUT", true, delivery);
      return fetch(fetchUrl, options).then(handleHttpErrors);
    }
  }

  function fetchAllDelivery() {
    const options = makeOptions("GET", true);
    const us = fetch(
      configuration.URL + "/api/delivery/allDeliveries",
      options
    ).then(handleHttpErrors);
    return us;
  }

  function deleteDriver(id) {
    const options = makeOptions("DELETE", true);
    return fetch(URL + "/api/driver/" + id, options).then(handleHttpErrors);
  }

  function addEditDriver(driver) {
    let fetchUrl = URL + "/api/driver";
    if (typeof driver.id === "undefined") {
      const options = makeOptions("POST", true, driver);
      return fetch(fetchUrl, options).then(handleHttpErrors);
    } else {
      const options = makeOptions("PUT", true, driver);
      return fetch(fetchUrl, options).then(handleHttpErrors);
    }
  }

  function fetchAllDriver() {
    const options = makeOptions("GET", true);
    const us = fetch(
      configuration.URL + "/api/driver/allDrivers",
      options
    ).then(handleHttpErrors);
    return us;
  }

  function fetchAllDriversByDate(date) {
    const options = makeOptions("GET", false);
    const us = fetch(
      configuration.URL + "/api/driver/driversByDate/" + date,
      options
    ).then(handleHttpErrors);
    return us;
  }

  function deleteTruck(id) {
    const options = makeOptions("DELETE", true);
    return fetch(URL + "/api/truck/" + id, options).then(handleHttpErrors);
  }

  function fetchAllTrucksByDate(date) {
    const options = makeOptions("GET", false);
    const us = fetch(
      configuration.URL + "/api/truck/trucksByDate/" + date,
      options
    ).then(handleHttpErrors);
    return us;
  }

  function fetchAllTrucks() {
    const options = makeOptions("GET", true);
    const us = fetch(configuration.URL + "/api/truck/allTrucks", options).then(
      handleHttpErrors
    );
    return us;
  }

  function addEditTruck(truck) {
    let fetchUrl = URL + "/api/truck";
    if (typeof truck.id === "undefined") {
      const options = makeOptions("POST", true, truck);
      return fetch(fetchUrl, options).then(handleHttpErrors);
    } else {
      const options = makeOptions("PUT", true, truck);
      return fetch(fetchUrl, options).then(handleHttpErrors);
    }
  }

  return {
    fetchUserInfo: fetchUserInfo,
    deleteCargo: deleteCargo,
    fetchAllCargo: fetchAllCargo,
    addEditCargoy: addEditCargoy,
    deleteDelivery: deleteDelivery,
    addEditDelivery: addEditDelivery,
    fetchAllDelivery: fetchAllDelivery,
    deleteDriver: deleteDriver,
    addEditDriver: addEditDriver,
    fetchAllDriver: fetchAllDriver,
    fetchAllDriversByDate: fetchAllDriversByDate,
    deleteTruck: deleteTruck,
    fetchAllTrucksByDate: fetchAllTrucksByDate,
    fetchAllTrucks: fetchAllTrucks,
    addEditTruck: addEditTruck
  };
};

let facade = endpointFacade();
export default facade;
