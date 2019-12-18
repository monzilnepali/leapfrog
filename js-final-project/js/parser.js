class Parser {
  constructor(tokens, context, actors) {
    this.tokens = tokens;
    this.context = context;
    this.signals = [];
    this.actors = actors;
  }
  parse() {
    this.uniqueActorArray();
    console.log(this.actors)
    this.signalArray();
    return this.signals;

  }
  uniqueActorArray() {
    this.tokens.forEach((element, index) => {
      if (element.type === 'actor') {
        if (this.findActor(element.value) === null) {
          let x = 0;
          if (this.actors.length !== 0) {
            let lastActor = this.actors[this.actors.length - 1];
            x = lastActor.x + lastActor.rectWidth + 100;
          }
          this.actors.push(new Actor(x, 0, element.value, this.context, index));
          // } else {
          //   let lastActor = this.actors[this.actors.length - 1];
          //   let secondLastActor = this.actors[this.actors.length - 2]
          //   lastActor.updateX(secondLastActor.x + secondLastActor.rectWidth + 100);
          //   lastActor.draw();
          // }
        }
      }
    });



  }
  signalArray() {
    this.tokens.forEach((element, index) => {
      if (element.type == 'col') {
        this.signals.push({
          index: index,
          actor1: this.findActor(this.tokens[index - 3].value),
          arrowType: this.tokens[index - 2].value,
          actor2: this.findActor(this.tokens[index - 1].value),
          message: this.tokens[index + 1].value
        });
      }
    });

  }

  findActor(name) {
    for (let i = 0; i < this.actors.length; i++) {
      if (this.actors[i].name === name) {
        return this.actors[i];
      }
    }
    return null;
  }
}