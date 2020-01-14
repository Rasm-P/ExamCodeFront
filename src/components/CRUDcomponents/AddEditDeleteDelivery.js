import React, { useState, useEffect } from "react";
import { Prompt, Link } from "react-router-dom";

const AddEditDeletedelivery = ({
  EndpointFacade,
  setIsBlocking,
  isBlocking,
  catchHttpErrors,
  setUpdate,
  allDeliveries
}) => {
  const emptyDelivery = {
    shippingDate: "2020-01-13T22:49:37.101Z",
    fromLocation: "",
    toLocation: ""
  };
  const [deliveryToAddEdit, setDeliveryToAddEdit] = useState({
    ...emptyDelivery
  });

  const storeAddEditDelivery = delivery => {
    EndpointFacade.addEditDelivery(delivery).catch(catchHttpErrors);
  };

  const deleteDelivery = id => {
    EndpointFacade.deleteDelivery(id).catch(catchHttpErrors);
    setUpdate(true);
  };

  const editDelivery = delivery => {
    const edit = { ...delivery };
    setDeliveryToAddEdit(edit);
  };

  const handleChange = event => {
    const target = event.target;
    const name = target.id;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setDeliveryToAddEdit({ ...deliveryToAddEdit, [name]: value });
    setIsBlocking(true);
  };

  function handleSubmit(event) {
    event.preventDefault();
    if (deliveryToAddEdit != emptyDelivery) {
      storeAddEditDelivery(deliveryToAddEdit);
      setDeliveryToAddEdit({ ...emptyDelivery });
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
        <h5>Add/Edit/Delete Delivery</h5>
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
              value={deliveryToAddEdit.id}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="shippingDate">
            Shipping Date:
          </label>
          <div className="col-sm-9">
            <input
              className="form-control"
              id="shippingDate"
              placeholder="Enter Shipping Date"
              value={deliveryToAddEdit.shippingDate}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="fromLocation">
            From Location:
          </label>
          <div className="col-sm-9">
            <input
              className="form-control"
              id="fromLocation"
              placeholder="Enter From Location"
              value={deliveryToAddEdit.fromLocation}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="toLocation">
            To Location:
          </label>
          <div className="col-sm-9">
            <input
              className="form-control"
              id="toLocation"
              placeholder="Enter To Location"
              value={deliveryToAddEdit.toLocation}
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
            <th>Shipping Date</th>
            <th>From Location</th>
            <th>To Location</th>
          </tr>
        </thead>
        <tbody>
          {allDeliveries.map(delivery => (
            <tr key={delivery.id}>
              <th>{delivery.id}</th>
              <th>{delivery.shippingDate}</th>
              <th>{delivery.fromLocation}</th>
              <th>{delivery.toLocation}</th>
              <td>
                (
                <a
                  href="xx"
                  onClick={e => {
                    e.preventDefault();
                    editDelivery(delivery);
                  }}
                >
                  edit
                </a>
                ,
                <a
                  href="xx"
                  onClick={e => {
                    e.preventDefault();
                    deleteDelivery(delivery.id);
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

export default AddEditDeletedelivery;
