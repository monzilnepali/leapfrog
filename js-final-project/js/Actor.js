class Actor {
  constructor(x, y, name, context) {
    this.x = x;
    this.y = y;
    this.name = name;
    this.context = context;
    this.rectWidth = this.context.measureText(name).width + 40;
    this.rectHeight = 30;
    this.height = 400;

  }
  updateWidth(message) {
    this.message = message;
    let messageWidth = this.context.measureText(this.message).width;
    this.width = (messageWidth > 150) ? messageWidth : 150;
  }
  updateX(x) {
    this.x = x;
  }
  draw() {
    console.log("drawing")
    this.context.beginPath();
    this.context.font = '18px Arial';
    //aligning text at center of rect
    this.context.fillStyle = "black";
    this.context.fillText(this.name, this.x + this.rectWidth / 2 - (this.rectWidth - 40) / 2, this.y + this.rectHeight / 2 + 10 / 2);
    this.context.strokeStyle = 'black';
    this.context.strokeRect(this.x, this.y, this.rectWidth, this.rectHeight);
    //drawing line below actor
    this.drawLine();


  }
  drawLine() {
    this.context.beginPath();
    this.context.rect(this.x + this.rectWidth / 2, this.y + this.rectHeight, 3.5, this.height);
    this.context.fillStyle = 'black';
    this.context.fill();
  }
}