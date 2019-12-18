class Diagram {
  constructor(context, signals) {
    this.context = context;
    this.signals = signals;
  }
  draw() {
    this.signals.forEach((element, index) => {
      let actor1 = element.actor1;
      let actor2 = element.actor2;
      let swapStatus = false;
      //drawing always from left side of canvas
      if (actor1.index > actor2.index) {
        let temp = actor2;
        actor2 = actor1;
        actor1 = temp;
        swapStatus = true;
      }
      if (actor1.name === actor2.name) {
        //do nothing
        console.log("same actor")
      } else {
        let maxdistance = this.context.measureText(element.message).width + 10;
        let mindistance = actor2.x - actor1.x;
        let distance = (maxdistance > mindistance) ? maxdistance : mindistance;
        actor1.draw();
        actor2.updateX(actor1.x + distance);
        actor2.draw();
        if (swapStatus) {
          actor1.drawArrow(distance, element.message, index, true);
        } else {
          actor1.drawArrow(distance, element.message, index, false);
        }

      }
    });
  }
}