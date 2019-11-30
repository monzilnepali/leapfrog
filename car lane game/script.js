var mainCar = null;
var WIDTH = 804;
var HEIGHT = 780;
var LANE_SHIFT = 72 * 2;
var LEFT_LANE_POSITION = (157 + 72);
var MIDDLE_LANE_POSITION = LEFT_LANE_POSITION + LANE_SHIFT;
var RIGHT_LANE_POSITION = MIDDLE_LANE_POSITION + LANE_SHIFT;


function Road(parent, x, y) {
  this.x = x;
  this.y = y;
  this.dy = 5;
  this.element = null;
  this.parent = parent;
}

//car A D and event handler

document.addEventListener("keypress", function (event) {

  //a=97 d =100
  //for a event handling
  if (event.keyCode == 97 && mainCar.currentLane != 1) {
    console.log("moving to left")
    mainCar.steerLeft();
  }
  if (event.keyCode == 100 && mainCar.currentLane != 3) {
    console.log("moving to right")
    mainCar.steerRight();
  }


});

Road.prototype.create = function () {
  var lanDiv = document.createElement("div");
  lanDiv.style.left = this.x + "px";
  lanDiv.style.top = this.y + "px";
  lanDiv.classList.add("road-asset");
  //setting image of road
  var randomImage = Math.floor(Math.random() * 3) + 1;
  lanDiv.style.backgroundImage = "url(./images/assets/road-asset-" + randomImage + ".png";
  this.element = lanDiv
  this.parent.appendChild(lanDiv)
}
Road.prototype.move = function () {
  //console.log("moved")
  this.y += this.dy;
  this.draw();
}
Road.prototype.draw = function () {
  this.element.style.top = this.y + 'px';
}


function Car(parentElement, x, y) {
  this.x = x;
  this.y = y;
  this.element = null;
  this.currentLane = 0;
  this.parent = parentElement;
}
Car.prototype.createCar = function () {
  var car = document.createElement('div');
  car.classList.add('main-car');
  car.style.left = this.x + 'px';
  car.style.top = this.y + 'px';
  this.element = car;
  this.parent.appendChild(car);
  return this;
}

Car.prototype.move = function () {

  this.element.style.left = this.x + 'px';
  this.element.style.top = this.y + 'px';

}

Car.prototype.moveToMiddle = function () {
  this.x = MIDDLE_LANE_POSITION;
  this.currentLane = 2;
  this.move();
}
Car.prototype.steerLeft = function () {
  //decreasing value of x
  //if current lane index =1 mean end of road from left side
  if (this.currentLane != 1) {
    this.x = this.x - LANE_SHIFT;
    this.currentLane = this.currentLane - 1;
    this.move();
  }


}


Car.prototype.steerRight = function () {
  //if current lane index =3 mean end of road from right side
  if (this.currentLane != 3) {
    this.x = this.x + LANE_SHIFT;
    this.currentLane = this.currentLane + 1;
    this.move();
  }
}


function Game(parentElement) {
  this.roadElements = [];
  var height = 795;

  Game.prototype.init = function () {

    //creating main car
    mainCar = new Car(parentElement, 10, 655).createCar();
    mainCar.moveToMiddle();

    //road asset creation
    for (var i = 0; i < 3; i++) {
      var lane = new Road(parentElement, 0, (270 + 50) * i)
      lane.create();
      this.roadElements.push(lane);
    }
    this.animateLane();
  }
}
Game.prototype.animateLane = function () {
  var that = this;
  var interval = setInterval(function () {
    that.roadElements.forEach(element => {
      element.move();
      if (element.y >= 730) {
        // console.log("crossed")
        element.y = -270;
      }
    });
  }, 10);

}

var parentElement = document.getElementById('app');
var game = new Game(parentElement);
game.init()