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
    this.height = 50;
    this.context.font = '18px Arial';
    let text = this.context.measureText(this.name);
    console.log(text.width)
    this.width = text.width + 50;
    this.context.fillText(this.name, this.x + this.width / 2 - text.width / 2, this.y + this.height / 2 + 10 / 2);
    this.context.rect(this.x, this.y, this.width, this.height);
    this.context.stroke();

    //drawing line below actor
    this.drawLine();

  }
  drawLine() {
    this.context.fillStyle = "black";
    this.context.fillRect(this.x + this.width / 2, this.y + this.height, 3, 400);
  }
}