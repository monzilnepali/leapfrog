class Editor {
  constructor(context) {
    this.context = context;
    let container = document.getElementById('editor-container');
    //creating line number text area
    let lineElement = document.createElement('textarea');
    lineElement.classList.add('line-number');
    lineElement.setAttribute('readonly', true);
    this.lineNumberElement = lineElement;
    this.lineNumberElement.value = "1";
    let textElement = document.createElement('textarea');
    textElement.classList.add('text-area');
    this.textArea = textElement;
    this.textArea.setAttribute('autofocus', 'true')
    this.textArea.oninput = this.inputChanged.bind(this);
    this.textArea.onscroll = this.scrollChange.bind(this);
    container.appendChild(lineElement);
    container.appendChild(textElement);


  }
  inputChanged() {
    let numberOfLine = this.countLine(this.textArea.value);
    let temp_arr = this.lineNumberElement.value.split('\n');
    let oldNumberOfLine = parseInt(temp_arr[temp_arr.length - 1]);
    //if there was change in line count
    if (numberOfLine != oldNumberOfLine) {
      this.updateRow(numberOfLine);
    }
    //checking the input validation using regrex and tokenize it using lexer
    this.lexInput(this.textArea.value);

  }
  lexInput(inputValue) {
    // console.log("value==>" + inputValue)
    // let lexer = new Lexer();
    // // let input = 'Andrew-china:hello china';
    // let token = lexer.tokenize(inputValue);
    // console.log(token);
    // if (token.type === 'error') {
    //   console.log(token.value);
    // } else if (token.type === 'token') {
    //   console.log(token.value);
    //   //  let dig = new Diagram(this.context, 0);
    //   //dig.draw(token.value);
    // }
    new LexerNew(new InputStream(inputValue));

  }



  scrollChange() {
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
    return text.split('\n').length;
  }

}