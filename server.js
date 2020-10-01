const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 25789;

app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(express.static(__dirname + "/public"));

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.listen(PORT, function (req, res) {
  console.log("App listening on PORT: " + PORT);
});
