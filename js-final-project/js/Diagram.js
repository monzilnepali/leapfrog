class Diagram {
  constructor(context, id) {
    this.id = id;
    this.context = context;

  }
  draw(data) {
    console.log(data);
    this.actors = data.actor;
    let type = data.type;
    let actor1 = data.actor[0];
    let actor2 = data.actor[1];
    let arrow = data.arrow;
    let signal = data.signal;
    //creating actor 1
    let actor1Object = new Actor(0, 0, actor1, this.context).draw();
    //draw arrow
    let actor2Object = new Actor(this.drawArrow(signal, actor1Object.width), 0, actor2, this.context).draw();

  }
  drawArrow(signal, x) {
    // console.log("draw")
    this.context.font = '18px Arial';
    let width = this.context.measureText(signal).width + 100;
    console.log(signal)
    console.log(width);
    this.context.fillRect(x - x / 2, 40 + 40, width, 4);
    //adding text on top of line
    this.context.fillText(signal, 0 + 100, 70)
    return width;
  }



}