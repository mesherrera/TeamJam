let translateTarget;
let word;
let partOfSpeech;
let wikiLink;
let googleTransLink;

const btn = document.getElementById("myCheck");
// On mouse-over, execute myFunction
function myFunction() {
  event.preventDefault(translateTarget);
  chrome.tabs.executeScript(
    {
      code: "window.getSelection().toString();"
    },
    function(selection) {
      translateTarget = selection;
      // alert(selection[0]);
    }
  );
  fetch(
    `https://www.dictionaryapi.com/api/v3/references/spanish/json/${translateTarget}?key=51a3d131-7eb1-4a9a-926b-29d55b25e4c1`
  )
    .then(data => data.json())
    .then(data => {
      // console.log(data);
      word = data[0].shortdef;
      partOfSpeech = data[0].fl;
      wikiLink = `https://es.wikipedia.org/wiki/${word}`;
      googleTransLink = `https://translate.google.com/#view=home&op=translate&sl=en&tl=es&text=${translateTarget}`
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

    if (count === 1) {

      const outputPOS = document.createElement("div");
      const outputDef = document.createElement("div");
      const outputOriginal = document.createElement("div");
      //create buttons for google and wiki
      const wikiBtn = document.createElement("button");
      const googleBtn = document.createElement("button");
      const wikipLink = document.createElement("a");
      const googleLink = document.createElement("a");
      
      // event.preventDefault(wikiBtn);
      // event.preventDefault(googleBtn);
      
      //Assigns inner text to each created div
      outputDef.innerText = word;
      outputPOS.innerText = partOfSpeech;
      outputOriginal.innerText = translateTarget;
      
      //give those buttons Ids
      wikiBtn.setAttribute('id','wikiBtn');
      googleBtn.setAttribute('id','googBtn');
      //add links to a tags
      wikipLink.setAttribute('href',wikiLink);
      googleLink.setAttribute('href',googleTransLink)
      wikipLink.innerHTML = 'Wikipedia';
      googleLink.innerHTML = 'Google Translate'
      
      
      // Add to pop up
      document.querySelector("#original").appendChild(outputOriginal);
      document.querySelector("#definition").appendChild(outputDef);
      document.querySelector("#speech").appendChild(outputPOS);
      //add Buttons to pop up
      document.querySelector("#dictionary").appendChild(wikiBtn);
      document.querySelector("#dictionary").appendChild(googleBtn);
      //Add links to goog and wiki buttons
      document.querySelector('#wikiBtn').appendChild(wikipLink);
      document.querySelector('#googBtn').appendChild(googleLink);


    }
    count++;
  }
  return callback;
}

const createDictionaryRef = realCreateDictionaryRef();
