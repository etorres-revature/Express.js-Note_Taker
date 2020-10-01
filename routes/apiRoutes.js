var fs = require("fs");

module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    fs.readFile(__dirname + "/../db/db.json", (err, data) => {
      if (err) throw err;
      let notes = JSON.parse(data);
      return res.json(notes);
    });
  });

  app.post("/api/notes", function (req, res) {
    var newNote = req.body;
    let allNotes = [];
    let id = 0;
    fs.readFile(__dirname + "/../db/db.json", "utf8", function (err, data) {
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
        __dirname + "/../db/db.json",
        JSON.stringify(allNotes),
        "utf8",
        function (err) {
          if (err) throw err;
          res.end();
        }
      );
    });
  });

  app.delete("/api/notes/:id", function (req, res) {
    const deleteID = req.params.id;
    fs.readFile(__dirname + "/../db/db.json", "utf8", function (err, data) {
      if (err) throw err;
      const deleteNote = JSON.parse(data).filter((entry) => {
        return entry.id != deleteID;
      });
      fs.writeFile(
        __dirname + "/../db/db.json",
        JSON.stringify(deleteNote),
        "utf8",
        function (err) {
          if (err) throw err;
          res.send();
        }
      );
    });
  });
};
