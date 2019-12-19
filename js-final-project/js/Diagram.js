let ymax = 0;
class Diagram {
  constructor(elements, context) {
    this.elements = elements;
    this.context = context;
  }
  static get yMax() {
    //getting y value for all signal 
    return ymax;
  }
  draw() {
    this.drawTitle(this.elements.title);
    this.drawSignal(this.elements.signals);
    this.drawActor(this.elements.actors);

  }
  drawTitle(title) {
    if (title != "") {
      new Title(title, this.context).draw();
    }

  }
  drawActor(actors) {
    actors.forEach(element => {
      element.draw();
    });
  }
  drawSignal(signals) {
    signals.forEach((signal, index) => {
      let actor1 = this.findActor(signal.actors[0]);
      let actor2 = this.findActor(signal.actors[1]);
      let ypos = index * 60 + 155;
      ymax = ypos;
      signal.draw(actor1.x + actor1.rectWidth / 2, actor2.x + actor2.rectWidth / 2, ypos, this.context)

    });
  }

  findActor(name) {
    for (let i = 0; i < this.elements.actors.length; i++) {
      if (this.elements.actors[i].name === name) {
        return this.elements.actors[i];
      }
    }
    return null;
  }
}