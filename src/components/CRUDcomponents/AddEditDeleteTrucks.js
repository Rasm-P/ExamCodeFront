import React, { useState, useEffect } from "react";
import { Prompt, Link } from "react-router-dom";

const AddEditDeletetruck = ({
  EndpointFacade,
  setIsBlocking,
  isBlocking,
  catchHttpErrors,
  setUpdate,
  allTrucks
}) => {
  const emptyTruck = {
    name: "",
    capacity: 0
  };
  const [truckToAddEdit, setTruckToAddEdit] = useState({ ...emptyTruck });

  const storeAddEditTruck = truck => {
    EndpointFacade.addEditTruck(truck).catch(catchHttpErrors);
  };

  const deleteTruck = id => {
    EndpointFacade.deleteTruck(id).catch(catchHttpErrors);
    setTimeout(() => { setUpdate(true) }, 500);
  };

  const editTruck = truck => {
    const edit = { ...truck };
    setTruckToAddEdit(edit);
  };

  const handleChange = event => {
    const target = event.target;
    const name = target.id;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setTruckToAddEdit({ ...truckToAddEdit, [name]: value });
    setIsBlocking(true);
  };

  function handleSubmit(event) {
    event.preventDefault();
    if (truckToAddEdit != emptyTruck) {
      storeAddEditTruck(truckToAddEdit);
      setTruckToAddEdit({ ...emptyTruck });
      event.target.reset();
      setIsBlocking(false);
      setTimeout(() => { setUpdate(true) }, 500);
    } else {
      window.alert("Plase change the values in the fields before submition!");
    }
  }

  return (
    <div>
      <Link to={`/management`}>
        <h5>Add/Edit/Delete Truck</h5>
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
              value={truckToAddEdit.id}
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
              value={truckToAddEdit.name}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="capacity">
            Capacity:
          </label>
          <div className="col-sm-9">
            <input
              className="form-control"
              id="capacity"
              placeholder="Enter capacity"
              value={truckToAddEdit.capacity}
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
            <th>Capacity</th>
          </tr>
        </thead>
        <tbody>
          {allTrucks.map(truck => (
            <tr key={truck.id}>
              <th>{truck.id}</th>
              <th>{truck.name}</th>
              <th>{truck.capacity}</th>
              <td>
                (
                <a
                  href="xx"
                  onClick={e => {
                    e.preventDefault();
                    editTruck(truck);
                  }}
                >
                  edit
                </a>
                ,
                <a
                  href="xx"
                  onClick={e => {
                    e.preventDefault();
                    deleteTruck(truck.id);
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

export default AddEditDeletetruck;
