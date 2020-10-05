const path = require("path");

module.exports = (app) => {
  //* GET `/notes` - Should return the `notes.html` file.
  //get request to display page to write, save, and delete notes
  app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname + "/../public", "notes.html"));
  });

  //unnecessary code to display index.html home page - the wildcard covers this as well
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/../public", "index.html"));
  });

  //* GET `*` - Should return the `index.html` file
  //get request to display homepage no matter what is enterd into the address bar
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/../public", "index.html"));
  });
};
