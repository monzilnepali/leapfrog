class Actor {
  /**
   * 
   * @param {Number} x x location
   * @param {Number} y y location
   * @param {string} name name of actor
   * @param {type} context context of canvas
   */
  constructor(x, y, name, context) {
    this.x = x;
    this.y = y;
    this.name = name;
    this.context = context;
    this.width = this.context.measureText(this.name).width;
    this.signalPositionOffset = 120;
    this.rectWidth = this.width + 50;
    this.height = 50;

  }

  draw() {
    this.context.font = '18px Arial';
    //aligning text at center of rect
    this.context.fillText(this.name, this.x + this.rectWidth / 2 - this.width / 2, this.y + this.height / 2 + 10 / 2);
    this.context.strokeRect(this.x, this.y, this.rectWidth, this.height);
    //drawing line below actor
    this.drawLine();
  }
  drawLine() {
    this.context.fillStyle = "black";
    this.context.fillRect(this.x + this.rectWidth / 2, this.y + this.height, 3, 400);
  }
  drawArrow(width, message) {
    console.log("message" + message)
    this.context.fillText(message, 50, this.signalPositionOffset - 20);
    this.context.fillStyle = "black";
    this.context.fillRect(this.x + this.rectWidth / 2, this.signalPositionOffset, width + 2, 3);

  }
  updateX(x) {
    this.x = x;
    this.draw()
  }

}