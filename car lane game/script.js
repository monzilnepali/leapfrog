var mainCar = null;
var WIDTH = 804;
var HEIGHT = 780;
var LANE_SHIFT = 72 * 2;
var LEFT_LANE_POSITION = (157 + 72);
var MIDDLE_LANE_POSITION = LEFT_LANE_POSITION + LANE_SHIFT;
var RIGHT_LANE_POSITION = MIDDLE_LANE_POSITION + LANE_SHIFT;
var FPS = 60;
var UPDATE_Y = 5;
var gameLoop = null;
var gameStopFlag = true; //true means game is not stopped
var carHeight = 110;
var carWidth = 55;
var carLaneSwitch = false;
var distanceBetweenCar = 0;
var gameScore = 0;
var scoreContainer = null;
var gameTime = 0;
var laneIndex = ['001', '010', '011', '100', '101', '110'];
var counter = 0; //to prevent two car of same road section to call obstacle generate function
var laneInterval = null;


//car A D and event handler

document.addEventListener("keypress", function (event) {

  //a=97 d =100
  //for a event handling
  if (gameStopFlag) {
    if (event.keyCode == 97 && mainCar.currentLane != 1) {
      //console.log("moving to left");

      mainCar.steerLeft();

    }
    if (event.keyCode == 100 && mainCar.currentLane != 3) {
      // console.log("moving to right");
      mainCar.steerRight();
    }
  }

});

function Road(parent, x, y) {
  this.x = x;
  this.y = y;
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
Road.prototype.moveY = function () {
  this.y += UPDATE_Y;
  this.draw();
}
Road.prototype.draw = function () {
  this.element.style.top = this.y + 'px';
}


function Car(parentElement, x, y, flag, currentRoadSegment) {
  this.x = x;
  this.y = y;
  this.width = 52;
  this.height = 105;
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
Car.prototype.moveY = function () {

  this.y += UPDATE_Y;
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
    // this.x = this.x - LANE_SHIFT;
    this.currentLane = this.currentLane - 1;
    this.element.style.transform = 'rotate(-40deg)';
    this.laneSwitchAnimation(0);

  }


}

Car.prototype.steerRight = function () {
  //if current lane index =3 mean end of road from right side
  if (this.currentLane != 3) {
    //this.x = this.x + LANE_SHIFT;
    this.currentLane = this.currentLane + 1;
    this.element.style.transform = 'rotate(40deg)';
    this.laneSwitchAnimation(1);

  }
}

Car.prototype.laneSwitchAnimation = function (temp) {
  var audio = playSFX('./audio/cardrift.mp3', false);

  var steps = 0;
  var dx = 20;
  var that = this;
  laneInterval = setInterval(function () {
      steps += dx;
      if (temp === 0) {
        that.x -= dx;
      } else {
        that.x += dx;
      }
      that.draw();
      if (steps >= LANE_SHIFT) {
        clearInterval(laneInterval);
        audio.pause();
        that.element.style.transform = 'rotate(0deg)';
      }
    },
    23);

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
    scoreContainer.classList.add('score-top');
    scoreContainer.innerText = '0';
    parentElement.appendChild(scoreContainer);
    //road asset creation
    for (var i = 0; i < 3; i++) {
      var lane = new Road(parentElement, 0, (270 + 50) * i)
      lane.create();
      this.generateObstacle(i);
      this.roadElements.push(lane);
    }


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


    } else {
      //ORing  current pattern with previous pattern 
      var oring = randomNumber | this.obstacleIndex[index - 1];
      if (oring < 6) {
        //mean space for main car to passby obstacle
        //  if(this.obstacleIndex.indexOf)
        obstacleFlag = true;

      }
    }

  } while (!obstacleFlag);

  this.obstacleIndex.push(randomNumber);

  pattern = laneIndex[randomNumber - 1].split("");



  var currentRoadSegment = index || temp;


  for (var i = 2; i >= 0; i--) {
    //creating max two car object in single lane element
    if (parseInt(pattern[i]) === 1) {
      //create car if pattern value =1
      var car = new Car(parentElement, 0, -(55 + 350) * index - 80, 1, currentRoadSegment).createCar();


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



  if (car.currentRoadSegment == counter) {
    this.obstacleIndex.shift();


    this.otherCar = this.otherCar.filter(function (element) {

      if (element.currentRoadSegment === car.currentRoadSegment) {

        element.delete();
      }
      return element.currentRoadSegment != car.currentRoadSegment;
    });



    this.generateObstacle(0, car.currentRoadSegment);
    counter = (counter + 1) % 3;
  }

}



Game.prototype.animateLane = function () {
  var that = this;


  gameLoop = setInterval(function () {
    //make car move faster after each 15 sec
    console.log(gameTime)
    if (gameTime % 500 == 0) {
      UPDATE_Y += 0.5;
      console.log("updarted y" + UPDATE_Y)
    }

    console.log(gameTime);
    that.roadElements.forEach(function (roadElement, index) {
      //checking collision with main car
      // if (mainCar.x == that.otherCar[index].x) {
      //check collision with other car in same line
      that.checkCollision(that.otherCar[index]);
      // }
      //checking border for road element
      //if exceed reset its position
      if (roadElement.y >= 785) {
        roadElement.y = -200; //reset y into intial position
      }
      roadElement.moveY();
    });
    that.otherCar.forEach(function (car, index) {
      if (car.y >= 785 + 250) {
        gameScore += 5;
        scoreContainer.innerText = gameScore;
        that.updateObstaclePosition(car);
      }
      car.moveY(); //update position
    });
    //update game time
    gameTime += Math.ceil((1000 / FPS) / 1000);
  }, 1000 / FPS);

}



Game.prototype.checkCollision = function (otherCar) {

  if (mainCar.x < otherCar.x + otherCar.width &&
    mainCar.x + mainCar.width > otherCar.x &&
    mainCar.y < otherCar.y + otherCar.height &&
    mainCar.y + otherCar.height > otherCar.y) {

    //terminate game
    clearInterval(laneInterval);
    playSFX('./audio/car-crash.ogg', false)

    // if (mainCar.x < otherCar.x) {
    //   console.log("main car" + mainCar.x)
    //   console.log("main car" + otherCar.x)
    //   console.log("right")
    //   mainCar.moveTo(otherCar.x - otherCar.width)
    // } else {
    //   console.log("main car" + mainCar.x)
    //   console.log("main car" + otherCar.x)
    //   console.log("left")
    //   mainCar.moveTo(otherCar.x + otherCar.width)
    // }

    gameStopFlag = false;
    //move to
    clearInterval(gameLoop);
    //showing game over screen
    tryAgainContainer();


  }

}

var parentElement = document.getElementById('app');
var startElement = document.getElementById('start-btn');
var scoreElement = document.getElementById('score-value');
var gameOverElement = document.getElementById('game-over-container');
var tryAgainElement = document.getElementById('try-again');

function startScreen() {


  //start screen
  var startContainer = document.createElement('div');
  startContainer.classList.add('start-screen');
  var startElement = document.createElement('div');
  startElement.classList.add('start-btn');
  startElement.setAttribute('id', 'start-btn');
  startElement.innerText = 'play';
  startContainer.appendChild(startElement);
  parentElement.appendChild(startContainer);
  startElement.addEventListener('click', function () {

    var game = new Game(parentElement);
    startElement.parentElement.style.display = 'none';
    game.init()
  });


}

function playSFX(src, loop) {
  var audio = document.createElement('audio');
  audio.src = src;
  audio.loop = loop;
  audio.play();
  return audio;
}

function tryAgainContainer() {
  var mainContainer = document.createElement('div');
  mainContainer.classList.add('game-over-container');
  var mainWrapper = document.createElement('div');
  mainWrapper.classList.add('game-over-wrapper');
  var heading = document.createElement('div');
  heading.classList.add('heading');
  heading.innerText = 'Game Over';
  var subHeading = document.createElement('p');
  subHeading.classList.add('subheading');
  subHeading.innerText = 'your score';
  var scoreValue = document.createElement('div');
  scoreValue.classList.add('score-value');
  scoreValue.innerText = gameScore;
  var tryAgain = document.createElement('div');
  tryAgain.classList.add('try-again');

  mainWrapper.appendChild(heading);
  mainWrapper.appendChild(subHeading);
  mainWrapper.appendChild(scoreValue);
  mainWrapper.appendChild(tryAgain);

  mainContainer.appendChild(mainWrapper);
  parentElement.appendChild(mainContainer);

  tryAgain.addEventListener('click', function () {

    //resetting all global variable
    counter = 0;
    gameScore = 0;
    //remove all element from parentElement
    parentElement.innerHTML = "";
    var game = new Game(parentElement);
    gameStopFlag = true;
    game.init();

  });



}

startScreen();