var express = require("express");
var path = require("path");
var fs = require("fs");

var app = express();
var PORT = process.env.PORT || 25789;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/public", "index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname + "/public", "notes.html"));
});

app.get("/api/notes", function (req, res) {
  fs.readFile(__dirname + "/db/db.json", (err, data) => {
    if (err) throw error;
    let notes = JSON.parse(data);
    console.log(notes);
    return res.json(notes);
  });
});

app.post("/api/notes", function (req, res) {
  var newNote = req.body;
  var noteTitle = req.body.title;
  var noteText = req.body.text;
  console.log("Note title: " + noteTitle);
  console.log("Note text :" + noteText);
  console.log(newNote);
  let allNotes = [];
  fs.readFile(__dirname + "/db/db.json", "utf8", function (err, data) {
    if (err) throw err;
    allNotes = JSON.parse(data);
    console.log(allNotes);
    allNotes.push(newNote);
    console.log(allNotes);
    fs.writeFile(__dirname + "/db/db.json", JSON.stringify(allNotes), "utf8", function (error) {
      if (error) throw error;
    });
  });
});

app.listen(PORT, function (req, res) {
  console.log("App listening on PORT: " + PORT);
});
