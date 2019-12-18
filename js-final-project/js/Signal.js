class Signal {
  constructor(message, actors, swap) {
    this.message = message;
    this.actors = actors;
    this.swap = swap


  }
  draw(x1, x2, y, context) {
    this.x1 = x1;
    this.x2 = x2;
    this.y = y;
    this.context = context;
    this.context.beginPath();
    this.context.moveTo(x1, y);
    this.context.lineTo(x2, y);
    this.context.stroke();
    //display message
    let textWidth = this.context.measureText(this.message).width;
    if (this.swap) {
      let temp = this.x2;
      this.x2 = this.x1;
      this.x1 = temp;
    }
    let centerX = this.x1 + 20;
    this.context.fillText(this.message, centerX, y - 5);
    this.drawArrowPointer(this.swap)
  }
  drawArrowPointer(direction) {
    console.log("draw")
    //direction true:point to left side
    //direction false=point to right side
    this.context.beginPath();
    if (direction) {
      this.context.moveTo(this.x1, this.y);
      this.context.lineTo(this.x1 + 8, this.y + 8);
      this.context.lineTo(this.x1 + 8, this.y - 8);
    } else {
      this.context.moveTo(this.x2, this.y);
      this.context.lineTo(this.x2 - 8, this.y - 8);
      this.context.lineTo(this.x2 - 8, this.y + 8);
    }
    this.context.fill();
  }

}