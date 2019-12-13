class Lexer {
  constructor(input) {
    this.input = input;
    this.keyword = " Note right of  left of ";
    this.token = [];
  }
  is_char(ch) {
    return /[a-zA-z]/.test(ch);
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
      let str = this.readString();
      console.log("string" + str)
      if (this.is_keyword(str)) {
        this.token.push({
          type: 'token',
          value: str
        });
      } else {
        this.token.push({
          type: 'actor',
          value: str
        });
      }

    } else if (ch === "-") {
      /*
      checking if there is any string before arrow sign
      if not show error
      */
      if (this.token.length != 0) {
        this.token.push({
          type: 'arrow',
          value: this.readArrowSign()
        });
      } else {
        this.showError(ch);
      }


    } else if (ch == ":") {
      this.token.push({
        type: 'col',
        value: this.input.next()
      });
      //reading string after :
      this.token.push({
        type: 'message',
        value: this.readString()

      });

    } else {
      //throw erro
      this.input.error(ch);

    }




  }

  showError(ch) {
    this.input.error(ch);
  }


  tokenize() {
    let counter = 0;
    while (counter != this.input.length) {
      this.readNext();
      counter++;
    }
    if (!this.input.errorFlag) {
      console.log("no error")
      return this.token;
    } else {
      console.log(" error")
      return null;
    }

  }





}