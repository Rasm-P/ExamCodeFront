import React from "react";

const StartPage = props => {
  const { info } = props;

  return (
    <div className="col-sm-offset-3 col-sm-9">
      <h1>{info.msg}</h1>
      <h4>Instructions</h4>
      <p>
        Preconditions: In order to use this code, you should have a local
        developer setup + a "matching" droplet on Digital Ocean as described in
        the 3. semester guidelines. See the backend github repository for more
        information.
      </p>
      <h5>Backend Setup</h5>
      <p>
        To set up the project backend to work on your machine and pipeline,
        change the following:
      </p>
      <ul>
        <li>pom.xml : Domain name</li>
        <li>config.properties : names of both databases</li>
        <li>.travis.yaml : name of test database</li>
        <li>Travis, environment variables: REMOTE_USER + REMOTE_PW</li>
        <li>
          rest, @OpenAPIDefinition: Local and remote server url for openapi.
        </li>
        <li>
          CorsResponseFilter, Access-Control-Allow-Origin: Your frontend
          deployment
        </li>
        <li>
          if you want user functionality: run the createUserRoles.sql script on
          your non-test database
        </li>
      </ul>
      <h5>Frontend Setup</h5>
      <p>To set up the project frontend, do the following:</p>

      <ul>
        <li>do "npm install" and "npm install react-router-dom"</li>
        <li>Change the URL in settings.js</li>
        <li>
          to deploy the project with surge: (1) do "npm install -g surge", (2)
          do "npm run build", and (3) do "surge --project ./build --domain
          YourDomainName.surge.sh"
        </li>
      </ul>
    </div>
  );
};

export default StartPage;
