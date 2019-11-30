function Lane(parent, x, y) {
  this.x = x;
  this.y = y;
  this.dy = 5;
  this.element = null;
  this.parent = parent;
}
Lane.prototype.create = function () {
  var lanDiv = document.createElement("div");
  lanDiv.style.left = this.x + "px";
  lanDiv.style.top = this.y + "px";
  lanDiv.classList.add("lane");
  this.element = lanDiv
  this.parent.appendChild(lanDiv)
}
Lane.prototype.move = function () {
  console.log("moved")
  this.y += this.dy;
  this.draw();
}
Lane.prototype.draw = function () {
  this.element.style.top = this.y + 'px';
}

function Game(parentElement) {
  this.lane = [];
  var height = 795;

  Game.prototype.init = function () {

    //crating five lane
    for (var j = 0; j < 2; j++) {
      //two lane
      for (var i = 0; i < 5; i++) {
        var lane = new Lane(parentElement, 320 + 150 * j, (85 + 80) * i);
        lane.create();
        this.lane.push(lane);
        console.log("lane created")
      }
    }
    this.animateLane();

  }
}
Game.prototype.animateLane = function () {
  var that = this;
  var interval = setInterval(function () {
    that.lane.forEach(element => {
      element.move();
      if (element.y >= 790) {
        console.log("crossed")
        element.y = -50;
      }
    });
  }, 50);

}

var parentElement = document.getElementById('app');
var game = new Game(parentElement);
game.init()