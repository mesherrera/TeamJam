let translateTarget;
let word;
let partOfSpeech;

const btn = document.getElementById("myCheck");
// On mouse-over, execute myFunction
function myFunction() {
  event.preventDefault(translateTarget);
  chrome.tabs.executeScript( {
    code: "window.getSelection().toString();"
  }, function(selection) {
    translateTarget = selection;
    // alert(selection[0]);
  });
  fetch(
    `https://www.dictionaryapi.com/api/v3/references/spanish/json/${translateTarget}?key=51a3d131-7eb1-4a9a-926b-29d55b25e4c1`
  )
    .then(data => data.json())
    .then(data => {
      // console.log(data);
      word = data[0].shortdef;
      partOfSpeech = data[0].fl;
      createDictionaryRef();
      // console.log("word", word, "pOS", partOfSpeech);
      // document.body.style.backgroundColor = "red"; //DEBUG, Remove Me Later
    })
    .catch(() => console.log("error"));
}

if (btn) {
  btn.addEventListener("click", myFunction);
  /// Fetch request
}

// Create divs for the pop up
function realCreateDictionaryRef() {

  let count = 0;

  function callback() {
    if(count > 0) {
      const outputPOS = document.createElement("div");
      const outputDef = document.createElement("div");
      const outputOriginal = document.createElement("div");

      //Assigns inner text to each created div
      outputDef.innerText = word;
      outputPOS.innerText = partOfSpeech;
      outputOriginal.innerText = translateTarget;

      // Add to pop up
      document.querySelector("#dictionary").appendChild(outputOriginal);
      document.querySelector("#dictionary").appendChild(outputDef);
      document.querySelector("#dictionary").appendChild(outputPOS);
    }
    count++;
  }
  return callback;
}

const createDictionaryRef = realCreateDictionaryRef();

