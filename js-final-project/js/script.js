window.onload = function () {
  settingWrapperWidthHeight();
  creationOfTextArea();
  //adding eventhandler to all example li

  let exampleElements = document.getElementsByClassName('example');


  loadJSON(function (response) {
    // Parsing JSON string into object
    let exampleJson = JSON.parse(response);
    Array.from(exampleElements).forEach(element => {
      element.addEventListener('click', switchExample, false);
      element.myParam = exampleJson;
    });
  });
}

function switchExample(e) {
  console.log(e.currentTarget.myParam)
  let jsonData = e.currentTarget.myParam;
  let textAreaElement = document.getElementsByClassName('text-area')[0];
  let prevActiveElement = document.getElementsByClassName('active')[0];
  if (prevActiveElement) {
    //removing active class from prev active element
    prevActiveElement.classList.remove('active');
  }
  e.target.classList.add('active')
  let id = e.target.getAttribute('data-id');
  let data = jsonData['example' + id].join('\n');
  textAreaElement.value = data;
  let event = new Event('input');
  textAreaElement.dispatchEvent(event);
}

function creationOfTextArea() {
  let container = document.getElementById('editor-container');
  //creating line number text area
  let lineElement = document.createElement('textarea');
  lineElement.classList.add('line-number');
  lineElement.setAttribute('readonly', true);
  lineElement.value = "1";
  let textElement = document.createElement('textarea');
  textElement.classList.add('text-area');
  textElement.setAttribute('autofocus', 'true')
  textElement.setAttribute('spellcheck', 'false')
  container.appendChild(lineElement);
  container.appendChild(textElement);
}

function settingWrapperWidthHeight() {
  let container = document.getElementById('container');
  let wrapperRightContainter = document.getElementById('wrapper-right');
  let wrapperleftContainter = document.getElementById('editor-container');
  //setting main container width as per window 
  container.style.height = Math.ceil(window.innerHeight) + "px";
  wrapperRightContainter.style.height = window.innerHeight + 'px';
  wrapperRightContainter.style.width = (window.innerWidth * 0.68) + 'px';
  wrapperleftContainter.style.height = window.innerHeight + 'px';
  wrapperleftContainter.style.width = (window.innerWidth * 0.32) + 'px';

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