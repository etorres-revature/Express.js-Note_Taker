const express = require("express");
const path = require("path");
const fs = require("fs");
const notesTaken = require("./db/db.json");

const app = express();
const PORT = process.env.PORT || 25789;

let allNotes = [...notesTaken];

app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
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
    // console.log(notes);
    return res.json(notes);
  });
});

app.post("/api/notes", function (req, res) {
  var newNote = req.body;
  // var noteTitle = req.body.title;
  // var noteText = req.body.text;
  // console.log("Note title: " + noteTitle);
  // console.log("Note text :" + noteText);
  // console.log("newNote before", newNote);
  let id = 0;
  for (let i = 0; i < allNotes.length; i++) {
    if (allNotes[i].id > id) {
      // console.log("This is id", id);
      // console.log("this is index", allNotes[i].id)
      id = allNotes[i].id;
    }
  }
  newNote.id = parseInt(id) + 1;
  // console.log("newNote after", newNote);
  // console.log(newNote)
  // console.log(id)

  fs.readFile(__dirname + "/db/db.json", "utf8", function (err, data) {
    if (err) throw err;
    allNotes = JSON.parse(data);
    allNotes.push(newNote);
    fs.writeFile(
      __dirname + "/db/db.json",
      JSON.stringify(allNotes),
      "utf8",
      function (err) {
        if (err) throw err;
      }
    );
  });
});

app.delete("/api/notes/:id", function (req, res) {
  for (let i = 0; allNotes.length; i++) {
    if (allNotes[i].id === req.params.id) {
      allNotes.splice(i, 1);
      break;
    }
  }
  fs.writeFile(__dirname + "/db/db.json", JSON.stringify(allNotes), function (
    err
  ) {
    if (err) throw err;
    console.log(`The note with id ${req.params.id} has been deleted.`);
  });
});

app.listen(PORT, function (req, res) {
  console.log("App listening on PORT: " + PORT);
});
