3. Semester, Exam

React SPA app project.

Deployment: TestExamExerciseType2Front.surge.sh

Instructions
==================
Preconditions: In order to use this code, you should have a local developer setup + a "matching" droplet on Digital Ocean as described in the 3. semester guidelines. See the backend github repository for more information.

Backend Setup
==================
To set up the project backend to work on your machine and pipeline, change the following:

- pom.xml : Domain name
- config.properties : names of both databases
- .travis.yaml : name of test database
- Travis, environment variables: REMOTE_USER + REMOTE_PW
- rest, @OpenAPIDefinition: Local and remote server url for openapi.
- CorsResponseFilter, Access-Control-Allow-Origin: Your frontend deployment
- if you want user functionality: run the createUserRoles.sql script on your non-test database

Frontend Setup
==================
To set up the project frontend, do the following:

- do "npm install" and "npm install react-router-dom"
- Change the URL in settings.js
- to deploy the project with surge: (1) do "npm install -g surge", (2) do "npm run build", and (3) do "surge --project ./build --domain YourDomainName.surge.sh"