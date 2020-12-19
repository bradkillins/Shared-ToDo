/******************************
 *       Server Setup
 ******************************/

const express = require("express");
const session = require("express-session");
const cors = require("cors");
const uuid = require("uuid").v4;
const app = express();
const port = require("./config").port;
const origin = require("./config").origin;

app.listen(port, () => {
  console.log("Listening on Port: ", port);
});
/******************************
 *   Session/Passport setup
 ******************************/
app.use(
  session({
    secret: "shh, don't tell anyone this!!",
    genid: (req) => uuid(),
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 } //60 minutes
  })
);

/******************************
 *          CORS
 ******************************/

const corsOptions = {
  origin: origin,
  optionsSuccessStatus: 200,
  credentials: true
};
app.use(cors(corsOptions));

/******************************
 *          Routing
 ******************************/

//import api routes from routes.js
app.use(require("./routes"));

// app.get("/", (req, res) => {
//   res.send("<h1>Hello World</h1>");
// });

//send 404 if requested route doesn't exist
app.use("/", (req, res) => {
  res.status(404).json({
    success: false,
    body: { error: "404 - URI not found" }
  });
});
