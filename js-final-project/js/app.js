class App {
  constructor() {
    new Editor(this.context);
  }

}

window.onload = function () {
  var container = document.getElementById('container');
  container.style.height = window.innerHeight + "px";
  new App();
  let example1Data = "Title:Atm Transaction Sequence Diagram" +
    "\nuser->atm:card insert" +
    "\natm->user:enter your pin code" +
    "\nuser->atm:pin code send" +
    "\natm->bank:check this details";

  // let example1 = document.getElementById("example1");
  //example1.addEventListener('click', () => {
  //  console.log(this.exampleJson)
  //   let element = document.getElementsByClassName('text-area')[0];
  //   element.value = example1Data;
  //   let event = new Event('input');
  //   element.dispatchEvent(event);

  // });
  let exampleElements = document.getElementsByClassName('example');
  let textAreaEelement = document.getElementsByClassName('text-area')[0];
  Array.from(exampleElements).forEach(element => {
    element.addEventListener('click', () => {
      //getting other active element
      let prevActiveElement = document.getElementsByClassName('active')[0];
      if (prevActiveElement) {
        prevActiveElement.className = 'element';
      }
      element.classList.add('active')
      let id = element.getAttribute('data-id');
      let data = this.exampleJson['example' + id].join('\n');
      textAreaEelement.value = data;
      let event = new Event('input');
      textAreaEelement.dispatchEvent(event);
    })
  });

  loadJSON(function (response) {
    // Parsing JSON string into object
    var actual_JSON = JSON.parse(response);
    this.exampleJson = actual_JSON;
  });

}

function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', './example.json', true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}