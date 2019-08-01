const translateTarget = target;
var word;
var partOfSpeech;

fetch(
  `https://www.dictionaryapi.com/api/v3/references/spanish/json/${translateTarget}?key=51a3d131-7eb1-4a9a-926b-29d55b25e4c1`
)
  .then(data => data.json())
  .then(data => {
    word = data[0].shortdef;
    partOfSpeech = data[0].fl;
  });

// Create divs for the pop up
let pOS = document.createElement("div");
let def = document.createElement("div");

//Assigns inner text to each created div
spanishWord.innerHTML(word);
def.innerHTML(definition);
pOS.innerHTML(partOfSpeech);
