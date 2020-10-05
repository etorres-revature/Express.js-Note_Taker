//array of characters to create unique ID
let charArray = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "~",
  "?",
  ">",
  "<",
  "}",
  "{",
  "[",
  "]",
];

//Variable to hold length of id
const idLength = 15;

//funciton to generate ID 
function IDGenerator() {
    //variable with empty string to hold new ID
  let newID = "";
  //iterator to run the number of times in variable idLength
  for (let i = 0; i < idLength; i++) {
      //generating a random index nubmer
    let randomIndex = Math.floor(Math.random() * charArray.length);
    //creating a newID string from the array of characters using the random index generated
    newID = newID + charArray[randomIndex];
  }
  //returning the newID
  return newID;
}

//this module built with logic borrowed from the Password Generator
module.exports = IDGenerator;
