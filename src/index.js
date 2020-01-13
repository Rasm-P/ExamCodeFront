import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import loginFacade from "./Facade/loginFacade";
import EndpointFacade from "./Facade/EndpointFacade";
import "bootstrap/dist/css/bootstrap.min.css";

const AppFacade = () => {
  return (
    <div>
      <App loginFacade={loginFacade} EndpointFacade={EndpointFacade} />
    </div>
  );
};

ReactDOM.render(<AppFacade />, document.getElementById("root"));
