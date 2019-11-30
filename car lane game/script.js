var mainCar = null;
var WIDTH = 804;
var HEIGHT = 780;
var LANE_SHIFT = 72 * 2;
var LEFT_LANE_POSITION = (157 + 72);
var MIDDLE_LANE_POSITION = LEFT_LANE_POSITION + LANE_SHIFT;
var RIGHT_LANE_POSITION = MIDDLE_LANE_POSITION + LANE_SHIFT;
var FPS = 60;
var UPDATE_Y = 10;
var gameLoop = null;
var gameStopFlag = true;

function Road(parent, x, y) {
  this.x = x;
  this.y = y;
  this.dy = UPDATE_Y;
  this.element = null;
  this.parent = parent;
}

//car A D and event handler

document.addEventListener("keypress", function (event) {

  //a=97 d =100
  //for a event handling
  if (gameStopFlag) {
    if (event.keyCode == 97 && mainCar.currentLane != 1) {
      console.log("moving to left")
      mainCar.steerLeft();

    }
    if (event.keyCode == 100 && mainCar.currentLane != 3) {
      console.log("moving to right")
      mainCar.steerRight();
    }
  }

});

Road.prototype.create = function () {
  var lanDiv = document.createElement("div");
  lanDiv.style.left = this.x + "px";
  lanDiv.style.top = this.y + "px";
  lanDiv.classList.add("road-asset");
  //setting image of road
  var randomImage = Math.floor(Math.random() * 4) + 1;
  console.log("rand" + randomImage)
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


function Car(parentElement, x, y, flag) {
  this.x = x;
  this.y = y;
  this.width = 55;
  this.height = 110;
  this.element = null;
  this.currentLane = 0;
  this.parent = parentElement;
  this.flag = flag || 0; //0 mean main car and 1 mean obstacle car
  this.dy = UPDATE_Y;
}
Car.prototype.createCar = function () {
  var car = document.createElement('div');
  if (this.flag == 0) {
    car.classList.add('main-car');
  } else {
    car.classList.add('other-car');
    var randomCar = Math.floor(Math.random() * 5) + 1;
    car.style.backgroundImage = 'url(./images/assets/car-' + randomCar + '.png)';
  }
  car.style.left = this.x + 'px';
  car.style.top = this.y + 'px';
  this.element = car;
  this.parent.appendChild(car);
  return this;
}

Car.prototype.draw = function () {

  this.element.style.left = this.x + 'px';
  this.element.style.top = this.y + 'px';

}
Car.prototype.move = function () {

  this.y += this.dy;
  this.draw();
}
Car.prototype.moveTo = function (valuex) {
  this.x = valuex;
  this.draw();
}

Car.prototype.moveToMiddleLane = function () {
  this.x = MIDDLE_LANE_POSITION;
  this.currentLane = 2;
  this.draw();
}

Car.prototype.moveToLeftLane = function () {
  this.x = LEFT_LANE_POSITION;
  this.currentLane = 1;
  this.draw();
}

Car.prototype.moveToRightLane = function () {
  this.x = RIGHT_LANE_POSITION;
  this.currentLane = 3;
  this.draw();
}




Car.prototype.steerLeft = function () {
  //decreasing value of x
  //if current lane index =1 mean end of road from left side
  if (this.currentLane != 1) {
    this.x = this.x - LANE_SHIFT;
    this.currentLane = this.currentLane - 1;
    this.draw();
  }


}


Car.prototype.steerRight = function () {
  //if current lane index =3 mean end of road from right side
  if (this.currentLane != 3) {
    this.x = this.x + LANE_SHIFT;
    this.currentLane = this.currentLane + 1;
    this.draw();
  }
}


function Game(parentElement) {
  this.roadElements = [];
  this.otherCar = [];

  Game.prototype.init = function () {
    //creating main car
    mainCar = new Car(parentElement, 10, 655).createCar();
    mainCar.moveToMiddleLane();

    //road asset creation

    for (var i = 0; i < 3; i++) {
      var lane = new Road(parentElement, 0, (270 + 50) * i)
      lane.create();

      var car = new Car(parentElement, 0, (55 + 100) * i, 1).createCar();


      var rand = Math.floor(Math.random() * 3) + 1;
      console.log(rand)
      if (rand === 1) {
        console.log("move to left");
        car.moveToLeftLane();
      }
      if (rand === 2) {
        console.log("move to midelle");
        car.moveToMiddleLane();
      }
      if (rand === 3) {
        console.log("move to right");
        car.moveToRightLane();
      }
      this.otherCar.push(car);
      this.roadElements.push(lane);
    }
    this.animateLane();
  }
}
Game.prototype.animateLane = function () {
  var that = this;

  gameLoop = setInterval(function () {
    that.roadElements.forEach((roadElement, index) => {
      //checking collision with main car
      if (mainCar.x == that.otherCar[index].x) {
        //check collision with other car in same line
        console.log("same lane" + that.otherCar[index]);
        that.checkCollision(that.otherCar[index]);
      }

      //checking border for road element
      //if exceed reset its position
      if (roadElement.y >= 785) {
        roadElement.y = -200; //reset y into intial position

      }
      if (that.otherCar[index].y >= 785) {
        that.otherCar[index].y = -200;
      }
      that.otherCar[index].move(); //update position
      roadElement.move();
    });
  }, 1000 / FPS);

}
Game.prototype.checkCollision = function (otherCar) {
  console.log("check collision")
  if (mainCar.x < otherCar.x + otherCar.width &&
    mainCar.x + mainCar.width > otherCar.x &&
    mainCar.y < otherCar.y + otherCar.height &&
    mainCar.y + otherCar.height > otherCar.y) {
    console.log("collision");
    //terminate game

    // if (mainCar.y != otherCar.y) {
    //   if (otherCar.x < mainCar.x) {
    //     mainCar.moveTo(otherCar.x + otherCar.width);
    //   } else {
    //     mainCar.moveTo(otherCar.x - otherCar.width);
    //   }
    // }

    gameStopFlag = false;
    //move to
    clearInterval(gameLoop);
  }

}

var parentElement = document.getElementById('app');
var startElement = document.getElementById('start-btn');

startElement.addEventListener('click', function () {
  var game = new Game(parentElement);
  startElement.parentElement.style.display = 'none';
  game.init()
});