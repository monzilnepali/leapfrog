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
  lanDiv.classList.add("road-asset");
  //setting image of road
  var randomImage = Math.floor(Math.random() * 2) + 1;
  console.log(randomImage)
  lanDiv.style.backgroundImage = "url(./images/assets/road-asset-" + randomImage + ".png";
  this.element = lanDiv
  this.parent.appendChild(lanDiv)
}
Lane.prototype.move = function () {
  //console.log("moved")
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

    for (var i = 0; i < 3; i++) {
      // var lane = new Lane(parentElement, 320 + 150 * j, (85 + 80) * i);
      var lane = new Lane(parentElement, 0, (270 + 50) * i)
      lane.create();
      this.lane.push(lane);
      // console.log("lane created")
    }

    this.animateLane();

  }
}
Game.prototype.animateLane = function () {
  var that = this;
  var interval = setInterval(function () {
    that.lane.forEach(element => {
      element.move();
      if (element.y >= 700) {
        console.log("crossed")
        element.y = -270;
      }
    });
  }, 10);

}

var parentElement = document.getElementById('app');
var game = new Game(parentElement);
game.init()