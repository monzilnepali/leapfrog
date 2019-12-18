class Signal {
  constructor(x, y, context, index) {
    this.x = x;
    this.y = y;
    this.context = context;
    this.index = index;

  }
  draw(width, msg) {
    this.width = width;
    let message = msg;
    let height = 3;
    //aligning text at center of signal
    let textWidth = this.context.measureText(msg).width;
    let centerX = this.x + this.width / 2 - textWidth / 2;
    this.context.fillText(message, centerX, this.y - 5);
    this.context.fillStyle = "black";
    this.context.fillRect(this.x, this.y, this.width, height);
    return this;
  }

}