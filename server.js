//require the express library
const express = require("express");
const logger = require("morgan");
const compression = require("compression");

//create a variable for the express function and a dynamic variable for the server port
const app = express();
const PORT = process.env.PORT || 25789;

app.use(logger("dev"));
app.use(compression());

//middleware for url encoding, json, and static display of HTML
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

//require the api routes and html routes files
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

//turning on the server
app.listen(PORT, (req, res) => {
  console.log("App listening on http://localhost:" + PORT);
});
