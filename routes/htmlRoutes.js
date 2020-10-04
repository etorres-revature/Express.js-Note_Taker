const path = require("path");

module.exports = function (app) {
  //* GET `/notes` - Should return the `notes.html` file.
  //get request to display page to write, save, and delete notes
  app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname + "/../public", "notes.html"));
  });

  //unnecessary code to display index.html home page - the wildcard covers this as well
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/../public", "index.html"));
  });

  //* GET `*` - Should return the `index.html` file
  //get request to display homepage no matter what is enterd into the address bar
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname + "/../public", "index.html"));
  });
};
