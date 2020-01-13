import configuration from "../settings";
import { handleHttpErrors } from "../utils";
import jwt_decode from "jwt-decode";

const URL = configuration.URL;

const loginFacade = () => {
  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
      }
    };
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };

  const tokenDecoder = () => {
    let decodedToken = jwt_decode(localStorage.getItem("jwtToken"));
    return decodedToken;
  };

  const setToken = token => {
    localStorage.setItem("jwtToken", token);
  };
  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };
  const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  };
  const logout = () => {
    localStorage.removeItem("jwtToken");
  };

  const login = (user, pass) => {
    const options = makeOptions("POST", true, {
      username: user,
      password: pass
    });
    return fetch(URL + "/api/login", options)
      .then(handleHttpErrors)
      .then(res => {
        setToken(res.token);
      });
  };

  return {
    setToken: setToken,
    getToken: getToken,
    makeOptions: makeOptions,
    tokenDecoder: tokenDecoder,
    loggedIn: loggedIn,
    login: login,
    logout: logout
  };
};

let facade = loginFacade();
export default facade;
