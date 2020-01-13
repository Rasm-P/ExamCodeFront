import loginFacade from "./Facade/loginFacade";

export function catchHttpErrors(err) {
  if (err.status) {
    err.fullError.then(e => {
      console.log(e.message);
      alert(e.message);
      if (e.message === "Token not valid (timed out?)") {
        loginFacade.logout();
      }
    });
  } else {
    console.log("Network error");
  }
}

export function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  } else if (res.status !== 204) {
    return res.json();
  } else {
    return Promise.resolve({ rip: "" });
  }
}

export const makeOptions = (method, addToken, body) => {
  var opts = {
    method: method,
    headers: {
      "Content-type": "application/json",
      Accept: "application/json"
    }
  };
  if (addToken && loginFacade.loggedIn()) {
    opts.headers["x-access-token"] = loginFacade.getToken();
  }
  if (body) {
    opts.body = JSON.stringify(body);
  }
  return opts;
};
