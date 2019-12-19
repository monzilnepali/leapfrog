class App {
  constructor() {
    this.editor = new Editor(this.context);
  }
}

// window.onload = function () {

//   let container = document.getElementById('container');
//   let rotateBtn = document.getElementById('rotateBtn');
//   container.style.height = window.innerHeight + "px";
//   let wrapperRightContainter = document.getElementById('wrapper-right');
//   wrapperRightContainter.style.height = window.innerHeight + 'px';
//   wrapperRightContainter.style.width = (window.innerWidth * 0.68) + 'px';
//   let app = new App();
//   let exampleElements = document.getElementsByClassName('example');
//   let textAreaElement = document.getElementsByClassName('text-area')[0];
//   let prevActiveElement = document.getElementsByClassName('active')[0];
//   Array.from(exampleElements).forEach(element => {
//     element.addEventListener('click', () => {
//       //getting other active element

//       if (prevActiveElement) {
//         //removing active class from prev active element
//         prevActiveElement.classList.remove('active');
//       }
//       element.classList.add('active')
//       let id = element.getAttribute('data-id');
//       let data = this.exampleJson['example' + id].join('\n');

//       textAreaElement.value = data;
//       let event = new Event('input');
//       textAreaElement.dispatchEvent(event);
//     })
//   });

//   loadJSON(function (response) {
//     // Parsing JSON string into object
//     var actual_JSON = JSON.parse(response);
//     this.exampleJson = actual_JSON;
//   });

//   rotateBtn.addEventListener('click', () => {
//     console.log("rotate")
//     //change orientation
//     let mainContainer = document.getElementsByClassName('container')[0];
//     let rotateFlag = rotateBtn.getAttribute('data-id');
//     let leftContainer = document.getElementById('editor-container');
//     let rightContainer = document.getElementById('wrapper-right');
//     if (rotateFlag == 0) {
//       //current rotate data=0 mean portrait mode
//       //change to landscape mode
//       mainContainer.style.flexDirection = 'column';
//       leftContainer.classList.add('landscape-orientation')
//       rightContainer.classList.add('landscape-orientation')
//       rotateBtn.setAttribute('data-id', 1);
//       wrapperRightContainter.style.width = (window.innerWidth) + 'px';
//       app.editor.resizeCanvas();
//       let event = new Event('input');
//       textAreaElement.dispatchEvent(event);
//     } else {
//       //current rotate data=1 mean landscape mode
//       //change to portait mode
//       mainContainer.style.flexDirection = 'row';
//       leftContainer.classList.remove('landscape-orientation')
//       rightContainer.classList.remove('landscape-orientation')
//       rotateBtn.setAttribute('data-id', 0);
//       wrapperRightContainter.style.width = (window.innerWidth * 0.68) + 'px';
//       app.editor.resizeCanvas();
//       let event = new Event('input');
//       textAreaElement.dispatchEvent(event);
//     }



//   });

// }

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