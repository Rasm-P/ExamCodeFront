import React, { useState, useEffect } from "react";
import { Prompt, Link } from "react-router-dom";

const AddEditDeleteCargo = ({
  EndpointFacade,
  setIsBlocking,
  isBlocking,
  catchHttpErrors,
  setUpdate,
  allCargo
}) => {
  const emptyCargo = {
    name: "",
    weight: 0.0,
    units: 0
  };
  const [cargoToAddEdit, setCargoToAddEdit] = useState({ ...emptyCargo });

  const storeAddEditCargo = cargo => {
    EndpointFacade.addEditCargo(cargo).catch(catchHttpErrors);
  };

  const deleteCargo = id => {
    EndpointFacade.deleteCargo(id).catch(catchHttpErrors);
    setTimeout(() => { setUpdate(true) }, 500);
    ;
  };

  const editCargo = cargo => {
    const edit = { ...cargo };
    setCargoToAddEdit(edit);
  };

  const handleChange = event => {
    const target = event.target;
    const name = target.id;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setCargoToAddEdit({ ...cargoToAddEdit, [name]: value });
    setIsBlocking(true);
  };

  function handleSubmit(event) {
    event.preventDefault();
    if (cargoToAddEdit != emptyCargo) {
      storeAddEditCargo(cargoToAddEdit);
      setCargoToAddEdit({ ...emptyCargo });
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
        <h5>Add/Edit/Delete Cargo</h5>
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
              value={cargoToAddEdit.id}
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
              value={cargoToAddEdit.name}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="weight">
            Weight:
          </label>
          <div className="col-sm-9">
            <input
              className="form-control"
              id="weight"
              placeholder="Enter weight"
              value={cargoToAddEdit.weight}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="units">
            Units:
          </label>
          <div className="col-sm-9">
            <input
              className="form-control"
              id="units"
              placeholder="Enter units"
              value={cargoToAddEdit.units}
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
            <th>Weight</th>
            <th>Units</th>
          </tr>
        </thead>
        <tbody>
          {allCargo.map(cargo => (
            <tr key={cargo.id}>
              <th>{cargo.id}</th>
              <th>{cargo.name}</th>
              <th>{cargo.weight}</th>
              <th>{cargo.units}</th>
              <td>
                (
                <a
                  href="xx"
                  onClick={e => {
                    e.preventDefault();
                    editCargo(cargo);
                  }}
                >
                  edit
                </a>
                ,
                <a
                  href="xx"
                  onClick={e => {
                    e.preventDefault();
                    deleteCargo(cargo.id);
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

export default AddEditDeleteCargo;
