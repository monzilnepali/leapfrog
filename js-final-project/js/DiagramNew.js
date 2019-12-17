class DiagramNew {

  constructor(context, tokens, actors) {
    this.context = context;
    this.actors = actors;
    this.signal = [];

    tokens.forEach((element, index) => {

      if (element.type === 'actor') {
        if (!this.containActor(element.value)) {
          let x = 0;
          if (this.actors.length !== 0) {
            let prevActor = this.actors[this.actors.length - 1];
            x = prevActor.x + prevActor.rectWidth + 50;

          }
          this.actors.push(new Actor(x, 0, element.value, this.context));

        }
      }
      if (element.type == 'col') {
        this.signal.push({
          index: index,
          actor1: tokens[index - 3].value,
          arrowType: tokens[index - 2].value,
          actor2: tokens[index - 1].value,
          message: tokens[index + 1].value
        });
      }

    });
    console.log(this.actors)

  }

  containActor(name) {
    for (let i = 0; i < this.actors.length; i++) {
      if (this.actors[i].name === name) {
        return true;
      }
    }
  }




  draw() {

    this.signal.forEach((element, index) => {

      let actor1 = this.findActorObject(element.actor1);
      let actor2 = this.findActorObject(element.actor2);

      if (actor1.name === actor2.name) {
        actor1.draw();
      } else {
        let maxdistance = this.context.measureText(element.message).width + 20;
        let mindistance = actor2.x - actor1.x;
        let distance = (maxdistance > mindistance) ? maxdistance : mindistance;
        actor1.draw();
        actor2.updateX(actor1.x + distance);
        actor2.draw();
        actor1.drawArrow(actor2.x - actor1.x, element.message, index);
      }
    });

  }
  findActorObject(name) {
    for (let i = 0; i < this.actors.length; i++) {
      if (this.actors[i].name == name) {
        return this.actors[i];
      }
    }
  }

}