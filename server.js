const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 25789;

app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(express.static(__dirname + "/public"));

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

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname + "/public", "index.html"));
});

app.post("/api/notes", function (req, res) {
  var newNote = req.body;
  let allNotes = [];
  let id = 0;
  fs.readFile(__dirname + "/db/db.json", "utf8", function (err, data) {
    if (err) throw err;
    allNotes = JSON.parse(data);
    for (let i = 0; i < allNotes.length; i++) {
      if (allNotes[i].id > id) {
        id = allNotes[i].id;
      }
    }
    newNote.id = parseInt(id) + 1;
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
  const deleteID = req.params.id;

  fs.readFile(__dirname + "/db/db.json", "utf8", function (err, data) {
    if (err) throw err;
    data.filter = (entry) => {
      return entry.id !== deleteID;
    };
    fs.writeFile(
      __dirname + "/db/db.json",
      JSON.stringify(data),
      "utf8",
      function (err) {
        if (err) throw err;
      }
    );
  });
});

app.listen(PORT, function (req, res) {
  console.log("App listening on PORT: " + PORT);
});
