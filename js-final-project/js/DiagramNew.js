class DiagramNew {

  constructor(tokens) {
    this.createCanvas();
    this.actors = [];
    this.signal = [];
    tokens.forEach((element, index) => {

      if (element.type == 'actor') {
        if (this.actors.indexOf(element.value) == -1) {
          this.actors.push({
            index: index,
            name: element.value
          });
        }
      }
      if (element.type == 'arrow') {
        this.signal.push({
          index: index,
          arrowType: element.value,
          actor1: tokens[index - 1],
          actor2: tokens[index + 1],
          message: tokens[index + 3].value


        });
      }

    });
    this.drawActor();

  }
  createCanvas() {
    this.canvas = document.getElementById('app');
    this.canvas.width = "1000";
    this.canvas.height = "400";
    this.context = this.canvas.getContext('2d');


  }
  drawActor() {
    this.actors.forEach((element, index) => {

      let actor1Object = new Actor(index * 150, 0, element.name, this.context).draw();

    });


  }

}