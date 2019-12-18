class DiagramNew {
  constructor(elements, context) {
    this.elements = elements;
    this.context = context;
  }
  draw() {
    this.drawActor(this.elements.actors);
    this.drawSignal(this.elements.signals);
  }
  drawActor(actors) {
    actors.forEach(element => {
      element.draw();
    });
  }
  drawSignal(signals) {
    signals.forEach((signal, index) => {
      console.log(signal)
      let actor1 = this.findActor(signal.actors[0]);
      let actor2 = this.findActor(signal.actors[1]);
      let ypos = index * 50 + 100;
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