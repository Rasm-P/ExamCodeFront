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

  return {
    fetchUserInfo: fetchUserInfo
  };
};

let facade = endpointFacade();
export default facade;
