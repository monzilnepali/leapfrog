class Editor {
  constructor(params) {
    let container = document.getElementById('editor-container');
    //creating line number text area
    let lineElement = document.createElement('textarea');
    lineElement.classList.add('line-number');
    lineElement.setAttribute('readonly', true);
    this.lineNumber = lineElement;
    let textElement = document.createElement('textarea');
    textElement.classList.add('text-area');
    this.textArea = textElement;
    this.textArea.oninput = this.inputChanged.bind(this);
    container.appendChild(lineElement);
    container.appendChild(textElement);


  }
  inputChanged() {
    console.log("changesd");

  }
}