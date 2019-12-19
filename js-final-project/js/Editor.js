class Editor {
  constructor(context) {
    this.context = context;
    this.textArea = document.getElementsByClassName('code-area')[0];
    this.textArea.oninput = this.inputChanged.bind(this);
    this.textArea.onscroll = this.scrollChange.bind(this);

    this.createCanvas();
    this.saveBtnElement = document.getElementById('saveBtn');
    this.saveBtnElement.onclick = this.saveImage.bind(this);

  }
  saveImage() {
    //save canvas asimage
    //saving context
    this.saveBtnElement.href = this.canvas.toDataURL();
    this.saveBtnElement.download = 'canvas.jpg';
  }
  inputChanged() {
    document.getElementById('errorMsg').innerText = "";
    document.getElementById('errorMsg').parentElement.style.backgroundColor = '#191a21'
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
    console.log("input changed")
    let lex = new Lexer(new InputStream(inputValue)).tokenize();
    if (lex != null) {
      //draw
      this.clearRect();
      let parse = new Parser(lex, this.context).parse();
      let diagram = new Diagram(parse, this.context);
      diagram.draw()

    } else {
      this.clearRect();
      //show error
    }

  }



  scrollChange() {
    console.log("scrollchange")
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
    let wrapper = document.getElementById('wrapper-right');
    console.log(wrapper.style.height)
    //checking for landscape or portrait mode status
    let wrapperWidth = parseInt(wrapper.style.width); //only parsing int from like 120px;
    let wrapperHeight = parseInt(wrapper.style.height);

    this.canvas.width = wrapperWidth * 0.965;
    //making canvas height responsive as canvas content push it down
    //getting wrapper right
    this.canvas.height = wrapperHeight * 0.945;
    this.context = this.canvas.getContext('2d');
    this.context.beginPath();
    this.context.rect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = 'white';
    this.context.fill();
    this.context.font = '18px Arial';


  }
  removeCanvas() {
    console.log("resize canvas");
    let wrapper = document.getElementById('wrapper-right');
    let wrapperWidth = parseInt(wrapper.style.width); //only parsing int from like 120px;
    let wrapperHeight = parseInt(wrapper.style.height);
    this.canvas.width = wrapperWidth * 0.965;
    //making canvas height responsive as canvas content push it down
    //getting wrapper right
    this.canvas.height = wrapperHeight * 0.945;

  }
  clearRect() {
    this.context.clearRect(0, 0, 1000, 752);
    this.context.beginPath();
    this.context.rect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = 'white';
    this.context.fill();
    this.context.font = '18px Arial';
  }

}