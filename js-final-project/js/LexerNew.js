class LexerNew {
  constructor(input) {
    this.input = input;
    this.keyword = " Note right of  left of ";
    this.token = [];
    this.read();
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
    while (!this.input.eof() && predication(this.input.peek())) {
      str += this.input.next();
    }

    return str;
  }

  readString() {
    let str = "";
    while (this.is_char(this.input.peek()) && !this.input.eof()) {
      str += this.input.next();
    }

    return str;
  }

  readArrowSign() {
    let str = "";
    while (this.is_arrow(this.input.peek()) && !this.input.eof()) {
      str += this.input.next();

    }
    return str;

  }
  readNext() {
    //first skip white space
    this.readWhile(this.is_whitespace);
    //if eof return null;
    if (this.input.eof()) return null;
    let ch = this.input.peek();
    if (this.is_char(ch)) {
      this.token.push({
        type: 'str',
        value: this.readString()
      });
      return;
    }
    if (ch === "-") {
      this.token.push({
        type: 'arrow',
        value: this.readArrowSign()
      });
      return;
    }
    if (ch == ":") {
      this.token.push({
        type: 'col',
        value: this.input.next()
      });
      //reading string after :
      this.token.push({
        type: 'string',
        value: this.readString()

      });
      return;
    }
    //throw erro
    this.input.error(ch);



  }


  read() {
    let counter = 0;

    while (counter != this.input.length) {
      this.readNext();
      counter++;
    }
    console.log(this.token);
  }





}