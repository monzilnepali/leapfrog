class Lexer {
  constructor(input) {
    this.input = input;
    this.keyword = " Note right of  left of ";
    this.token = [];

    this.tempToken = [];
    this.parseFlag = false;
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
      if (this.is_keyword(str)) {
        this.tempToken.push({
          type: 'token',
          value: str
        });
      } else {
        this.tempToken.push({

          type: 'actor',
          value: str
        });
      }

    } else if (ch === "-") {
      /*
      checking if there is any string before arrow sign
      if not show error
      */
      if (this.tempToken.length != 0) {
        this.tempToken.push({
          type: 'arrow',
          value: this.readArrowSign()

        });
      } else {
        this.showError(ch);
      }


    } else if (ch == ":") {
      //before : there must be actor to be valid
      // console.log(this.token[this.token.length - 1].type)
      //  if (this.token[this.token.length - 1].type === 'actor') {
      this.parseFlag = true;
      this.tempToken.push({
        type: 'col',
        value: this.input.next()
      });
      //reading string after :
      this.tempToken.push({
        type: 'message',
        value: this.readString()

      });
      this.token.push(this.tempToken);
      this.tempToken = [];






    } else {
      //if none of match
      //throw erro
      this.showError(ch);

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
    if (!this.input.errorFlag && this.parseFlag) {

      return this.token;
    } else {

      return null;
    }

  }




}