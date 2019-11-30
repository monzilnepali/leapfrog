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

  Game.prototype.init = function () {

    for (var i = )
      var lane = new Lane(parentElement, 50, 20);
    lane.create();
    console.log("lane crated")


    setInterval(function () {
      lane.move();
    }, 100);



  }
}

var parentElement = document.getElementById('app');
var game = new Game(parentElement);
game.init()