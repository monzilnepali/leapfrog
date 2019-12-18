class Signal {
  constructor(message, actors, swap) {
    this.message = message;
    this.actors = actors;
    this.swap = swap


  }
  draw(x1, x2, y, context) {

    context.beginPath();
    context.moveTo(x1, y);
    context.lineTo(x2, y);
    context.stroke();
    //display message
    let textWidth = context.measureText(this.message).width;
    let centerX = x1 + 20;
    if (this.swap) {
      centerX = x2 + 20;
    }

    context.fillText(this.message, centerX, y - 5);
  }

}