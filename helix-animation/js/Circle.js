class Circle {
  constructor(ctx, x, y, width) {
    this.context = ctx;
    this.x = x;
    this.y = y;
    this.radius = width;
  }

  draw(color) {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    this.context.fillStyle = color;
    this.context.fill();
    this.context.closePath();


  }

}