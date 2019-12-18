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
    this.signalPositionOffset = 120;
    this.rectWidth = this.width + 50;
    this.height = 50;
    this.signals = [];

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
  drawArrow(width, message, index) {
    let xpos = this.x + this.rectWidth / 2;
    let ypos = 40 * index + 100;


    if (this.signals.length == 0) {
      //create new signal 
      //creating first signal 
      this.signals.push(new Signal(xpos, ypos, this.context, index).draw(width, message));
    } else if (this.findSignal(index) == null) {
      //create new unique signal
      ypos = this.signals[this.signals.length - 1].y + 50;
      this.signals.push(new Signal(xpos, ypos, this.context, index).draw(width, message));
    } else {
      //update the existing signal width and message only
      this.findSignal(index).draw(width, message);
    }
  }
  updateX(x) {
    this.x = x;
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