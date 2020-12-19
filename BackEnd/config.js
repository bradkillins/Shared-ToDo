/******************************
 *      Server Config
 ******************************/

//Enter desired port for api server to run
//NOTE: this should be set to 5000 as all
// fetch calls route to "http://localhost:5000"
module.exports.port = 5000;

//Enter the domain to allow through the CORS policy
//This must match the domain of the frontend server.
module.exports.origin = "http://localhost:5080";

//mongoDB username: backend-client; password: mgD6Y0Eo0iPUmK85
module.exports.dbConfig = {
  dbUser: "backend-client",
  dbPass: "mgD6Y0Eo0iPUmK85",
  dbDefault: "SharedToDo"
};
