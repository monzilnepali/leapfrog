class Diagram {
  constructor(id) {
    this.id = id;
  }
  init(data) {
    console.log(data);
    this.type = data.type;
    this.actors = data.actor;
    this.arrow = data.arrow;
    this.signal = data.signal;
  }


}