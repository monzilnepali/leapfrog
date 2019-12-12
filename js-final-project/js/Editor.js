class Editor {
  constructor(params) {
    let container = document.getElementById('editor-container');
    //creating line number text area
    let lineElement = document.createElement('textarea');
    lineElement.classList.add('line-number');
    lineElement.setAttribute('readonly', true);
    this.lineNumberElement = lineElement;
    let textElement = document.createElement('textarea');
    textElement.classList.add('text-area');
    this.textArea = textElement;
    this.textArea.oninput = this.inputChanged.bind(this);
    this.textArea.onscroll = this.scrollChange.bind(this);
    container.appendChild(lineElement);
    container.appendChild(textElement);


  }
  inputChanged() {
    console.log("changesd");
    let numberOfLine = this.countLine(this.textArea.value);
    if (numberOfLine == 0) {
      numberOfLine = 1
    };
    let temp_arr = this.lineNumberElement.value.split('\n');
    let oldNumberOfLine = parseInt(temp_arr[temp_arr.length - 1]);
    //if there was change in line count
    if (numberOfLine != oldNumberOfLine) {
      this.updateRow(numberOfLine);
    }

  }
  scrollChange() {
    console.log("scoll change")
    //this.textArea.scrollTop = this.lineNumberElement.scrollTop;
    console.log(this.textArea.scrollTop)
    this.lineNumberElement.scrollTop = this.textArea.scrollTop;
  }
  updateRow(numberOfLine) {
    let tempstr = '';
    for (let i = 1; i <= numberOfLine; i++) {
      tempstr = tempstr + i.toString() + '\n';
    }
    this.lineNumberElement.value = tempstr;
  }
  countLine(text) {
    if (text == '') {
      return 1;
    }
    return text.split('\n').length + 1;
  }

}