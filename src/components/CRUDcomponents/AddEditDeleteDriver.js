import React, { useState, useEffect } from "react";
import { Prompt, Link } from "react-router-dom";

const AddEditDeleteDriver = ({
  EndpointFacade,
  setIsBlocking,
  isBlocking,
  catchHttpErrors,
  setUpdate,
  allDrivers
}) => {
  const emptyDriver = {
    name: ""
  };
  const [driverToAddEdit, setDriverToAddEdit] = useState({ ...emptyDriver });

  const storeAddEditDriver = driver => {
    EndpointFacade.addEditDriver(driver).catch(catchHttpErrors);
  };

  const deleteDriver = id => {
    EndpointFacade.deleteDriver(id).catch(catchHttpErrors);
    setUpdate(true);
  };

  const editDriver = driver => {
    const edit = { ...driver };
    setDriverToAddEdit(edit);
  };

  const handleChange = event => {
    const target = event.target;
    const name = target.id;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setDriverToAddEdit({ ...driverToAddEdit, [name]: value });
    setIsBlocking(true);
  };

  function handleSubmit(event) {
    event.preventDefault();
    if (driverToAddEdit != emptyDriver) {
      storeAddEditDriver(driverToAddEdit);
      setDriverToAddEdit({ ...emptyDriver });
      event.target.reset();
      setIsBlocking(false);
      setUpdate(true);
    } else {
      window.alert("Plase change the values in the fields before submition!");
    }
  }

  return (
    <div>
      <Link to={`/management`}>
        <h5>Add/Edit/Delete Driver</h5>
      </Link>
      <form
        className="form-horizontal"
        onChange={handleChange}
        onSubmit={handleSubmit}
      >
        <Prompt
          when={isBlocking}
          message={location =>
            `Are you sure you want to go to ${location.pathname}`
          }
        />
        <div className="form-group">
          <label className="control-label col-sm-3">Id:</label>
          <div className="col-sm-9">
            <input
              className="form-control"
              readOnly
              id="id"
              placeholder="Id"
              value={driverToAddEdit.id}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="name">
            Name:
          </label>
          <div className="col-sm-9">
            <input
              className="form-control"
              id="name"
              placeholder="Enter name"
              value={driverToAddEdit.name}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-3 col-sm-9">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {allDrivers.map(driver => (
            <tr key={driver.id}>
              <th>{driver.id}</th>
              <th>{driver.name}</th>
              <td>
                (
                <a
                  href="xx"
                  onClick={e => {
                    e.preventDefault();
                    editDriver(driver);
                  }}
                >
                  edit
                </a>
                ,
                <a
                  href="xx"
                  onClick={e => {
                    e.preventDefault();
                    deleteDriver(driver.id);
                  }}
                >
                  delete)
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddEditDeleteDriver;
