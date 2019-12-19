window.onload = function () {
  settingWrapperWidthHeight();
  creationOfTextArea();
  document.getElementById('rotateBtn').addEventListener('click', changeOrientation, false);
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

function changeOrientation() {
  let mainContainer = document.getElementsByClassName('container')[0];
  let rotateFlag = rotateBtn.getAttribute('data-id');
  let leftContainer = document.getElementById('editor-container');
  let rightContainer = document.getElementById('wrapper-right');
  if (rotateFlag == 0) {
    //current rotate data=0 mean portrait mode
    //change to landscape mode
    mainContainer.style.flexDirection = 'column';
    rotateBtn.setAttribute('data-id', 1);
    leftContainer.style.width = (document.body.scrollWidth) + 'px';
    rightContainer.style.width = (document.body.scrollWidth) + 'px';

  } else {
    //current rotate data=1 mean landscape mode
    //change to portait mode
    mainContainer.style.flexDirection = 'row';
    rotateBtn.setAttribute('data-id', 0);
    rightContainer.style.width = (window.innerWidth * 0.68) + 'px';
    leftContainer.style.width = (window.innerWidth * 0.32) + 'px';

  }
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