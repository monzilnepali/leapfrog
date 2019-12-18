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
    signals.forEach(element => {
      console.log(element)
    });
  }
}