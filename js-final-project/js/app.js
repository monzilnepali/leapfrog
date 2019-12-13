class App {
  constructor() {

    this.createCanvas();
    new Editor(this.context);

  }

  createCanvas() {
    this.canvas = document.getElementById('app');
    this.canvas.width = "1000";
    this.canvas.height = "400";
    this.context = this.canvas.getContext('2d');


  }
}

window.onload = function () {
  var container = document.getElementById('container');
  container.style.height = window.innerHeight + "px";
  let app = new App();
}