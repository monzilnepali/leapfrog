class DiagramNew {

  constructor(context, tokens) {
    this.context = context;
    this.actors = [];
    this.signal = [];
    this.tempActors = [];
    this.actorsObject = [];
    tokens.forEach((element, index) => {
      if (element.type == 'actor') {
        if (this.tempActors.indexOf(element.value) == -1) {
          this.actors.push({
            index: index,
            name: element.value
          });
          this.tempActors.push(element.value);
        }
      }
      if (element.type == 'arrow') {
        this.signal.push({
          index: index,
          arrowType: element.value,
          actor1: tokens[index - 1],
          actor2: tokens[index + 1],
          message: tokens[index + 3].value
        });
      }

    });


    this.drawActor();
    this.drawSignal();
    // this.drawArrow("hlo", 0);

  }

  drawActor() {
    this.actors.forEach((element, index) => {
      let actor1 = new Actor(index * 150, 0, element.name, this.context).draw();
      this.actorsObject.push(actor1);
    });


  }
  drawSignal() {
    this.signal.forEach((element, index) => {



    });
  }
  drawArrow(signal, x) {
    console.log(this.actorsObject)
    // console.log("draw")
    this.context.font = '18px Arial';
    let width = this.context.measureText(signal).width + 100;
    console.log(signal)
    console.log(width);
    this.context.fillRect(x - x / 2, 40 + 40, width, 2);
    //adding text on top of line
    this.context.fillText(signal, 0 + 100, 70);
    return width;
  }

}