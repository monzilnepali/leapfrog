class Parser {
  constructor(tokens, context) {
    this.tokens = tokens;
    this.context = context;
    this.signals = [];
    this.actors = [];
  }
  parse() {
    this.uniqueActorArray1();
    //console.log(this.actors)
    // this.signalArray();
    return {
      actors: this.actors,
      signals: this.signals
    };

  }

  uniqueActorArray1() {

    this.tokens.forEach((token, index) => {
      let actor = [];
      let arrowType = "";
      let message = "";
      let swapFlag = false;
      token.forEach((element) => {
        if (element.type === 'actor') {
          actor.push(element.value)
        } else if (element.type === 'arrow') {
          arrowType = element.value;
        } else if (element.type === 'message') {
          message = element.value
        }
      });



      //distance between actor
      let textWidth = this.context.measureText(message).width + 20;
      textWidth = (textWidth < 150) ? 150 : textWidth;
      actor.forEach((name, index) => {

        //first actor:(0,0)
        if (this.actors.length == 0) {
          this.actors.push(new Actor(0, 0, name, this.context));
        } else if (this.actors.length != 0 && this.findActor(name) === null) {
          //new actor element
          if (index == 0) {
            //message sender
            console.log("new sender")
            let lastActor = this.actors[this.actors.length - 1];
            //message is send to identify width
            this.actors.push(new Actor(lastActor.x + 150, 0, name, this.context));
          } else {
            //message receiver

            let senderActorX = this.actors[this.actors.length - 1].x + 150;
            let xpos = senderActorX;
            if (textWidth > senderActorX) {
              xpos = textWidth;
            }
            this.actors.push(new Actor(xpos, 0, name, this.context));
          }
        } else {

          if (index == 0) {
            // let actor1 = this.findActor(actor1(0));

          } else {

            //getting first actor 
            let from = this.findActor(actor[0]);
            let to = this.findActor(actor[1]);
            let actor1 = from.value;
            let actor2 = to.value;
            if (to.index < from.index) {
              //swapping
              console.log("Swapping")
              swapFlag = true;
              let temp = actor2;
              actor2 = actor1;
              actor1 = temp;
            }

            //update x of actor 
            let width = actor1.x + textWidth;
            if (width < actor2.x) {
              width = actor2.x;
            }
            console.log("width" + width)
            actor2.updateX(width);
          }
        }

      });
      this.signals.push(new Signal(message, actor, swapFlag))
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
        return {
          index: i,
          value: this.actors[i]
        };
      }
    }
    return null;
  }
}