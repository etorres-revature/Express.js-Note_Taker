var express = require("express");
var path = require("path");
var fs = require("fs");

var app = express();
var PORT = process.env.PORT || 25789;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"))
app.use(express.json());

app.get("", function (req, res) {
    res.sendFile(path.join(__dirname + "/public", "index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname + "/public", "notes.html"));
});

app.get("/api/notes", function (req, res) {
    const notes = fs.readFileSync(__dirname+"/db/db.json");
    return res.json(notes);
});

app.post("/api/notes", function (req, res) {
    var newNote = req.body;
    console.log(newNote);
    res.json(newNote);
})

app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});