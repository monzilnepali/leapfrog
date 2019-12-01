var mainCar = null;
var WIDTH = 804;
var HEIGHT = 780;
var LANE_SHIFT = 72 * 2;
var LEFT_LANE_POSITION = (157 + 72);
var MIDDLE_LANE_POSITION = LEFT_LANE_POSITION + LANE_SHIFT;
var RIGHT_LANE_POSITION = MIDDLE_LANE_POSITION + LANE_SHIFT;
var FPS = 60;
var UPDATE_Y = 8;
var gameLoop = null;
var gameStopFlag = true;
var carHeight = 110;
var carWidth = 55;
var carLaneSwitch = false;
var distanceBetweenCar = 0;
var gameScore = 0;
var scoreContainer = null;
var laneIndex = ['001', '010', '011', '100', '101', '110'];
var obstaclePositionUpdateFlag = false;
var counter = 0;

function findDistance(x1, y1, x2, y2) {
  //distance between two car
  return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
}



//car A D and event handler

document.addEventListener("keypress", function (event) {

  //a=97 d =100
  //for a event handling
  if (gameStopFlag) {
    if (event.keyCode == 97 && mainCar.currentLane != 1) {
      console.log("moving to left");
      mainCar.steerLeft();

      if (distanceBetweenCar <= 80) {
        gameScore += 5;
        console.log(gameScore);
        scoreContainer.innerText = gameScore;

      }

    }
    if (event.keyCode == 100 && mainCar.currentLane != 3) {
      console.log("moving to right");
      mainCar.steerRight();
      if (distanceBetweenCar <= 80) {
        gameScore += 5;
        console.log(gameScore);
        scoreContainer.innerText = gameScore;


      }
    }
  }

});

function Road(parent, x, y) {
  this.x = x;
  this.y = y;
  this.dy = UPDATE_Y;
  this.element = null;
  this.parent = parent;
}

Road.prototype.create = function () {
  var lanDiv = document.createElement("div");
  lanDiv.style.left = this.x + "px";
  lanDiv.style.top = this.y + "px";
  lanDiv.classList.add("road-asset");
  //setting image of road
  var randomImage = Math.floor(Math.random() * 4) + 1;
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


function Car(parentElement, x, y, flag, currentRoadSegment) {
  this.x = x;
  this.y = y;
  this.width = 55;
  this.height = 110;
  this.element = null;
  this.currentLane = 0;
  this.currentRoadSegment = currentRoadSegment || 0;
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

Car.prototype.delete = function () {
  this.parent.removeChild(this.element);
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
  this.obstacleIndex = [];


  Game.prototype.init = function () {
    //creating main car
    mainCar = new Car(parentElement, 10, 655).createCar();
    mainCar.moveToMiddleLane();

    //creating game element
    scoreContainer = document.createElement('div');
    scoreContainer.classList.add('score');
    parentElement.appendChild(scoreContainer);
    //road asset creation
    for (var i = 0; i < 3; i++) {
      var lane = new Road(parentElement, 0, (270 + 50) * i)
      lane.create();
      this.generateObstacle(i);
      this.roadElements.push(lane);
    }
    console.log(this.obstacleIndex)
    this.animateLane();
  }
}

Game.prototype.generateObstacle = function (index, temp) {
  var pattern = [];
  var randomNumber;
  var obstacleFlag = false;
  do {

    randomNumber = Math.floor(Math.random() * 6) + 1;
    //comparing with previous random no;
    //ORing random number and less than 7 accept
    if (this.obstacleIndex.length == 0) {
      //its mean first car pattern no to check with other
      obstacleFlag = true;
      console.log("first element in obstacle index")
    } else {
      //ORing  current pattern with previous pattern 
      var oring = randomNumber | this.obstacleIndex[index - 1];
      if (oring < 7) {
        //mean space for main car to passby obstacle
        obstacleFlag = true;
      }
    }

  } while (!obstacleFlag);

  this.obstacleIndex.push(randomNumber);
  console.log(">>>>>>" + this.obstacleIndex)
  pattern = laneIndex[randomNumber - 1].split("");
  //console.log(pattern);
  //console.log(this.obstacleIndex)

  var currentRoadSegment = index || temp;
  console.log("index" + index)
  console.log("currentroad segment" + currentRoadSegment);
  for (var i = 2; i >= 0; i--) {
    //creating max two car object in single lane element
    if (parseInt(pattern[i]) === 1) {
      //create car if pattern value =1
      var car = new Car(parentElement, 0, -(55 + 300) * index - 80, 1, currentRoadSegment).createCar();
      console.log("new car");
      console.log(car)
      this.otherCar.push(car);
      //shifting position
      if (i == 0) {
        car.moveToLeftLane();
      }
      if (i == 1) {
        car.moveToMiddleLane();
      }
      if (i == 2) {
        car.moveToRightLane();
      }
    }

  }


}

Game.prototype.updateObstaclePosition = function (car) {

  console.log("current road segement" + car.currentRoadSegment);
  if (car.currentRoadSegment == counter) {
    this.obstacleIndex.shift();
    console.log(this.obstacleIndex)
    //getting all car object current road segment
    this.otherCar = this.otherCar.filter(function (element) {

      if (element.currentRoadSegment === car.currentRoadSegment) {
        console.log("removed")
        element.delete();
      }
      return element.currentRoadSegment != car.currentRoadSegment;
    });

    console.log(this.otherCar)

    this.generateObstacle(0, car.currentRoadSegment);
    counter = (counter + 1) % 3;
  }






  //this.generateObstacle(car.currentRoadSegment)




}

Game.prototype.animateLane = function () {
  var that = this;

  gameLoop = setInterval(function () {
    that.roadElements.forEach(function (roadElement, index) {
      //checking collision with main car
      // if (mainCar.x == that.otherCar[index].x) {
      //check collision with other car in same line
      //that.checkCollision(that.otherCar[index]);
      //  }
      //checking border for road element
      //if exceed reset its position
      if (roadElement.y >= 785) {
        roadElement.y = -200; //reset y into intial position
      }
      roadElement.move();
    });

    that.otherCar.forEach(function (car, index) {

      if (car.y >= 785 + 250) {
        that.updateObstaclePosition(car);


      }
      car.move(); //update position

    });
  }, 1000 / FPS);

}



Game.prototype.checkCollision = function (otherCar) {

  if (mainCar.x < otherCar.x + otherCar.width &&
    mainCar.x + mainCar.width > otherCar.x &&
    mainCar.y < otherCar.y + otherCar.height &&
    mainCar.y + otherCar.height > otherCar.y) {
    //  console.log("collision");
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
  } else {
    //if not collide mean user change lane
    //giving points to use based on distance between main car other car in same //lane
    if (mainCar.currentLane == otherCar.currentLane) {
      distanceBetweenCar = findDistance(mainCar.x, mainCar.y, otherCar.x, otherCar.y + carHeight);
      console.log("distannce>>>" + distanceBetweenCar)
    }


  }

}

var parentElement = document.getElementById('app');
var startElement = document.getElementById('start-btn');

startElement.addEventListener('click', function () {
  var game = new Game(parentElement);
  startElement.parentElement.style.display = 'none';
  game.init()
});