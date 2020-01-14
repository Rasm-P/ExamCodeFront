import React, { useEffect, useState } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { catchHttpErrors } from "./utils";
import "./App.css";
import StartPage from "./components/Home";
import LogIn from "./components/LogIn";
import Header from "./components/Header";
import Logout from "./components/Logout";
import TruckDriverBooking from "./components/TruckDriverBooking";
import SortDeliveries from "./components/SortDeliveries";
import Management from "./components/Management";

const NoMatch = () => {
  return <h3>The page was not found.</h3>;
};

const App = props => {
  const { loginFacade, EndpointFacade } = props;

  const [loggedIn, setLoggedIn] = useState(false);
  const [info, setInfo] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setLoggedIn(loginFacade.loggedIn());
    }, 10000);
    setLoggedIn(loginFacade.loggedIn());
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    EndpointFacade.fetchUserInfo(
      loggedIn ? loginFacade.tokenDecoder().roles : ""
    )
      .then(data => setInfo(data))
      .catch(catchHttpErrors);
  }, [loggedIn]);

  return (
    <Router>
      <Header loginFacade={loginFacade} loggedIn={loggedIn} />
      <Switch>
        <Route exact path="/">
          <StartPage info={info} />
        </Route>
        <Route path="/login">
          <LogIn
            apiFacade={loginFacade}
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
          />
        </Route>
        <Route path="/logout">
          <Logout
            apiFacade={loginFacade}
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
          />
        </Route>
        <Route path="/truckDriverBooking">
          <TruckDriverBooking EndpointFacade={EndpointFacade} />
        </Route>
        <Route path="/sortDeliveries">
          <SortDeliveries EndpointFacade={EndpointFacade} />
        </Route>
        <Route path="/management">
          <Management loggedIn={loggedIn} EndpointFacade={EndpointFacade} />
        </Route>
        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  );
};
export default App;
