//require the file system built-in library for NODE.js
const fs = require("fs");

module.exports = (app) => {
  // * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
  app.get("/api/notes", (req, res) => {
    //read the db.json file to get all notes
    fs.readFile(__dirname + "/../db/db.json", (err, data) => {
      //error handling
      if (err) throw err;
      //parse the JSON in db.json
      const notes = JSON.parse(data);
      //return the parsed information in the notes variable to display on screen to user
      return res.json(notes);
    });
  });

  //* POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
  app.post("/api/notes", (req, res) => {
    //create variable to hold the body with information entered by the user
    const newNote = req.body;
    //empty array to hold the notes in the db.json file
    let allNotes = [];
    //variable for the id - using the idGenerator module that is exported/required
    let id = 0;
    //read the db.json file
    fs.readFile(__dirname + "/../db/db.json", "utf8", (err, data) => {
      //error handling
      if (err) throw err;
      //parsing the JSON data and setting it as the value for the empty array
      allNotes = JSON.parse(data);
      //for loop to go through all of the objects in the db.json array
      for (let i = 0; i < allNotes.length; i++) {
        //if logic to compare the current value of the id variable with the values of the ids in the array of object in db.json
        if (allNotes[i].id > id) {
          //if the objects id is greater than the current value of id setting the id variable to the id of the object
          //this logic will find the highest id value in the array of objects and set it to the id variable
          id = allNotes[i].id;
        }
      }
      //setting the id for the new note to the highest value of the id in the array of objects in db.json and adding one
      newNote.id = parseInt(id) + 1;
      //pushing the new note information onto the allNotes array
      allNotes.push(newNote);
      //write the db.json file with the new array of notes including the user entered informaiton in the body of the request
      fs.writeFile(
        __dirname + "/../db/db.json",
        //stringify the JSON array
        JSON.stringify(allNotes),
        "utf8",
        (err) => {
          //error handling
          if (err) throw err;
          //telling the program that the function is over
          res.end();
        }
      );
    });
  });

  //* DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete.
  app.delete("/api/notes/:id", (req, res) => {
    //taking in the id from the note selected to be deleted
    const deleteID = req.params.id;
    //read the db.json fil
    fs.readFile(__dirname + "/../db/db.json", "utf8", (err, data) => {
      //error handling
      if (err) throw err;
      //creating a new array using the filter over the parsed information from db.json
      const deleteNote = JSON.parse(data).filter((entry) => {
        //if the "entry" does not have the same id as the one deleted it is put back into the array
        return entry.id != deleteID;
      });
      //write the db.json file with the new array excluding the user deleted information
      fs.writeFile(
        __dirname + "/../db/db.json",
        //stringify the JSON array
        JSON.stringify(deleteNote),
        "utf8",
        (err) => {
          //error handling
          if (err) throw err;
          //telling the program that the function is over
          res.end();
        }
      );
    });
  });
};
