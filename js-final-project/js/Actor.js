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
  }
  /**
   * draw actor along with bottom line
   */
  draw() {
    this.height = 40;
    this.context.font = '18px Arial';
    let text = this.context.measureText(this.actor1);
    this.width = text.width + 10;
    this.context.beginPath();
    this.context.rect(this.x, this.y, this.width, this.height);
    this.context.stroke();
    this.context.fillText(this.name, this.x + 10, this.y + 25);
    //drawing line below actor
    this.drawLine();
    return this;
  }
  drawLine() {
    this.context.fillStyle = "black";
    this.context.fillRect(this.x + this.width / 2, this.y + this.height, 3, 400);
  }
}