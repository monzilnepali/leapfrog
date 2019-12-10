'use strict;'
class Lexer {
  constructor() {
    this.current = 0;
    this.tokens = [];
  }
  tokenize(input) {
    /* first spliting string using : seperator and check the type of operation in leftside of : */
    let inputArray = input.split(":");
    let instruction = inputArray[0];
    let message = inputArray[1];
    let symbol1 = /\b->\b/; //for line arrow
    let symbol2 = /\b->>\b/; //for open arrow
    let symbol3 = /\b-->\b/; //for DOTLINE
    let symbol4 = /\bNote/;
    /* -> means message send  */
    if (symbol1.exec(instruction)) {
      this.split(symbol1, instruction, 2, 'LINE_ARROW', message);
    } else if (symbol2.exec(instruction)) {
      this.split(symbol2, instruction, 3, 'OPEN_ARROW', message);
    } else if (symbol3.exec(instruction)) {
      this.split(symbol3, instruction, 3, 'DOT_ARROW', message);
    } else if (symbol4.exec(instruction)) {
      let res = "";
      if (instruction.search('right of') != -1) {
        res = instruction.replace("right of", "right_of");
      } else if (instruction.search('left of') != -1) {
        res = instruction.replace("left of", "left_of");
      } else if (instruction.search('over') != -1) {
        res = instruction.replace("over", "over");
      }
      let resArray = res.split(" ");
      console.log(res)
      this.tokens.push({
        type: 'note',
        position: resArray[1],
        actor: resArray[2],
        signal: message
      });
    }
    return this.tokens;
  }

  split(regrex, instruction, offset, lineType, message) {
    var startIndex = regrex.exec(instruction)['index'];
    let actor1 = "";
    let actor2 = "";
    for (let i = 0; i < startIndex; i++) {
      actor1 += instruction[i];
    }
    let endIndex = startIndex + offset;
    while (instruction[endIndex] != undefined) {
      actor2 += instruction[endIndex++];
    }
    this.tokens.push({
      type: 'message',
      actor: [actor1, actor2],
      arrow: lineType,
      signal: message
    });

  }









}