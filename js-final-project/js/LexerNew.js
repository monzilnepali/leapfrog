class LexerNew {
  constructor(input) {
    this.input = input;
    this.keyword = " Note right of  left of ";
    this.pos = 0;
    this.line = 1;
    this.col = 0;
    this.token = [];
    this.read();

  }
  /**
   * read each character from input stream 
   * if \n then update line number and col otherwise increase column number
   * return the next character in inputstream
   */
  next() {
    var ch = this.input.charAt(this.pos++);
    if (ch == '\n') {
      this.line++;
      this.col = 0;
    } else {
      this.col++;
    }
    return ch;
  }

  /**
   * get character at specific position in stream
   */
  peek() {
    return this.input.charAt(this.pos);
  }
  /**
   * end of file which return true if there is not character left to readNext
   */
  eof() {
    return this.peek() == "";
  }
  /**
   * return error message along with line number and column
   */
  error() {
    console.log(`errow ( ${this.line} ,  ${this.col}`);
  }

  is_char(ch) {
    return /[a-z]/.test(ch);
  }
  is_keyword(x) {
    return this.keyword.indexOf(" " + x + " ") >= 0;

  }

  is_whitespace(ch) {
    return " \t\n".indexOf(ch) >= 0;
  }
  is_arrow(ch) {
    return "->".indexOf(ch) >= 0;
  }
  readWhile(predication) {
    let str = "";
    while (!this.eof() && predication(this.peek())) {
      console.log("space");
      str += this.next();
    }
    console.log("checking" + str);
    return str;
  }

  readString() {
    let str = "";
    while (this.is_char(this.peek()) && !this.eof()) {
      str += this.next();
    }
    console.log(str);
    return str;
  }

  readArrowSign() {
    let str = "";
    while (this.is_arrow(this.peek()) && !this.eof()) {
      str += this.next();

    }
    return str;

  }
  readNext() {
    //first skip white space
    this.readWhile(this.is_whitespace);
    //if eof return null;
    if (this.eof()) return null;
    let ch = this.peek();
    if (this.is_char(ch)) {
      this.token.push({
        type: 'str',
        value: this.readString()
      })
    }
    if (ch === "-") {
      this.token.push({
        type: 'arrow',
        value: this.readArrowSign()
      })
    }


    this.readNext();


  }


  read() {
    while (this.readNext() != null);
    console.log(this.token)
  }





}