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
    this.context.fillText(message, this.x + 10, this.y - 5);
    this.context.fillStyle = "black";
    this.context.fillRect(this.x, this.y, this.width, height);
    return this;

  }

}