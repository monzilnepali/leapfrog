class main {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.maxCircleSize = 10;
    this.phase = 0;
    this.speed = 0.02;
    this.frameCount = 0;
    this.numRow = 10;
    this.numColumn = 10;
  }
  init() {
    this.canvas = document.getElementById('app');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext('2d');
    //this.loop = setInterval(() => this.animation(), 20);


    this.animation();

  }
  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }
  animation() {
    this.clear();
    //udpating x and y
    let x = 0;
    let y = 0;
    let columnOffset = 0;
    this.frameCount++;
    this.phase = this.frameCount * this.speed;

    for (let i = 0; i < 2; i++) {
      let newPhase = (i == 0) ? this.phase : this.phase * Math.PI;
      x = 0;
      for (let col = 0; col < this.numColumn; col++) {
        x += 15;
        columnOffset = (Math.PI * col) / this.numColumn;
        for (let row = 0; row < this.numRow; row++) {
          y = (this.height / 2) + Math.sin(newPhase + columnOffset) * 25 + row * 10;
          let sizeOffset = (Math.cos(newPhase - (row / this.numRow) + columnOffset) + 1) * 0.5;
          let circleSize = sizeOffset * this.maxCircleSize;
          new Circle(this.context, x, y, circleSize).draw();

        }
      }
    }



    window.requestAnimationFrame(() => this.animation());

  }

}


new main(600, 600).init();