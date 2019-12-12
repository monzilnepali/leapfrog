class App {
  constructor() {
    new Editor();
    this.createCanvas();
    this.readInput();
  }

  createCanvas() {
    this.canvas = document.getElementById('app');
    this.canvas.width = "1000";
    this.canvas.height = "400";
    this.context = this.canvas.getContext('2d');

  }
  readInput() {
    let lexer = new Lexer();
    let input = 'Andrew->china:hello china';
    let token = lexer.tokenize(input);
    let dig = new Diagram(this.context, 0);
    dig.draw(token[0]);

  }
}


let app = new App();