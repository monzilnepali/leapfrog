class Actor {
  /**
   * 
   * @param {Number} x x location
   * @param {Number} y y location
   * @param {string} name name of actor
   * @param {type} context context of canvas
   */
  constructor(x, y, name, context, index) {
    this.x = x;
    this.y = y;
    this.name = name;
    this.context = context;
    this.index = index;
    this.width = this.context.measureText(this.name).width;
    this.rectWidth = this.width + 50;
    this.height = 400;
    this.rectHeight = 50;
    this.signals = [];
  }

  draw() {
    this.context.font = '18px Arial';
    //aligning text at center of rect
    this.context.fillText(this.name, this.x + this.rectWidth / 2 - this.width / 2, this.y + this.rectHeight / 2 + 10 / 2);
    this.context.strokeRect(this.x, this.y, this.rectWidth, this.rectHeight);
    //drawing line below actor
    this.drawLine();
  }
  drawLine() {
    this.context.fillStyle = "black";
    this.context.fillRect(this.x + this.rectWidth / 2, this.y + this.rectHeight, 3, this.height);
  }
  drawArrow(width, message, index) {
    let xpos = this.x + this.rectWidth / 2;
    let ypos = 40 * index + 100;
    this.signals.push(new Signal(xpos, ypos, this.context, index).draw(width, message));
  }
  updateX(x) {
    this.clearActorRect();
    this.x = x;
  }
  clearActorRect() {
    this.context.clearRect(this.x - 2, this.y, this.rectWidth + 15, this.height);

  }

  findSignal(index) {
    for (let i = 0; i < this.signals.length; i++) {
      if (this.signals[i].index === index) {
        return this.signals[i];
      }
    }
    return null;
  }


}