class Signal {
  constructor(x, y, context, index) {
    this.x = x;
    this.y = y;
    this.context = context;
    this.index = index;


  }
  draw(width, msg, direction) {
    this.width = width;
    let message = msg;
    let height = 3;
    //aligning text at center of signal
    let textWidth = this.context.measureText(msg).width;
    let centerX = this.x + this.width / 2 - textWidth / 2;
    this.context.fillText(message, centerX, this.y - 5);
    this.context.fillStyle = "black";
    this.context.fillRect(this.x, this.y, this.width, height);
    //draw arrow 
    //this.drawArrowPointer(direction);

    return this;
  }
  drawArrowPointer(direction) {
    //direction true:point to left side
    //direction false=point to right side

    let xpos = this.x + this.width + 1;
    this.context.beginPath();

    if (direction) {
      this.context.moveTo(this.x, this.y + 2);
      this.context.lineTo(this.x + 8, this.y + 8);
      this.context.lineTo(this.x + 8, this.y - 8);
    } else {
      this.context.moveTo(xpos, this.y + 2);
      this.context.lineTo(xpos - 8, this.y + 8);
      this.context.lineTo(xpos - 8, this.y - 8);
    }
    this.context.fill();
  }

}