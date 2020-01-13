import React, { useState } from "react";
import { Redirect, Prompt } from "react-router-dom";
import { catchHttpErrors } from "../utils";

const Adminpage = props => {
  const { loggedIn } = props;
  const [isBlocking, setIsBlocking] = useState(false);
  return (
    <div className="col-sm-offset-3 col-sm-9">
      {loggedIn ? <div></div> : <Redirect to="/login" />}
    </div>
  );
};

export default Adminpage;
