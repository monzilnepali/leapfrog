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
    this.textArea.setAttribute('spellcheck', 'false')
    this.textArea.oninput = this.inputChanged.bind(this);
    this.textArea.onscroll = this.scrollChange.bind(this);
    container.appendChild(lineElement);
    container.appendChild(textElement);
    this.createCanvas();


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

    let lex = new Lexer(new InputStream(inputValue)).tokenize();
    if (lex != null) {
      //draw
      this.clearRect();
      let parse = new Parser(lex, this.context).parse();

      let diagram = new DiagramNew(parse, this.context);
      diagram.draw()
      // let diagram = new Diagram(this.context, parse);
      // diagram.draw();

    } else {
      this.clearRect();
      //show error
    }

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
  createCanvas() {
    this.canvas = document.getElementById('app');
    this.canvas.width = "1000";
    this.canvas.height = "400";
    this.context = this.canvas.getContext('2d');
  }
  clearRect() {

    this.context.clearRect(0, 0, 1000, 400);

  }

}