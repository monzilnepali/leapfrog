var WIDTH = 804;
var HEIGHT = 780;
var LANE_SHIFT = 72 * 2;
var LEFT_LANE_POSITION = (157 + 72);
var MIDDLE_LANE_POSITION = LEFT_LANE_POSITION + LANE_SHIFT;
var RIGHT_LANE_POSITION = MIDDLE_LANE_POSITION + LANE_SHIFT;
var FPS = 60;
var UPDATE_Y = 6;
var gameLoop = null;
var gameStopFlag = true; //true means game is not stopped
var carHeight = 110;
var carWidth = 55;
var distanceBetweenCar = 0;
var gameScore = 0;
var scoreContainer = null;
var gameTime = 0;
var laneIndex = ['001', '010', '011', '100', '101', '110'];
var counter = 0; //to prevent two car of same road section to call obstacle generate function
var laneInterval = null;
var mainCar = null;


function Bullet(x, y, parent) {
  this.x = x;
  this.y = y;
  this.height = 50;
  this.width = 10;
  this.element = null;
  this.parent = parent;

}
Bullet.prototype.create = function () {

  var bullet = document.createElement('div');
  bullet.classList.add('bullet');
  bullet.style.top = this.y + 'px';
  bullet.style.left = (this.x + 26) + 'px';
  this.element = bullet;
  this.parent.appendChild(bullet);
  return this;
}
Bullet.prototype.move = function () {
  this.y -= 5;
  this.draw();
}
Bullet.prototype.draw = function () {
  this.element.style.top = this.y + 'px';
}
Bullet.prototype.fire = function () {
  var fireInterval = setInterval(function () {
    console.log("fire")
    this.move();
  }.bind(this), 16);
  setTimeout(function () {
    clearInterval(fireInterval);
  }.bind(this), 5000);

}



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
    this.x = this.x - LANE_SHIFT;
    this.currentLane = this.currentLane - 1;
    this.element.style.transform = 'rotate(-40deg)';
    this.laneSwitchAnimation(0);
    this.draw();

  }


}

Car.prototype.steerRight = function () {
  //if current lane index =3 mean end of road from right side
  if (this.currentLane != 3) {
    this.x = this.x + LANE_SHIFT;
    this.currentLane = this.currentLane + 1;
    this.element.style.transform = 'rotate(40deg)';
    this.laneSwitchAnimation(1);
    this.draw();

  }
}

Car.prototype.laneSwitchAnimation = function (temp) {
  var audio = playSFX('./audio/cardrift.mp3', false);
  var steps = 0;
  var dx = 10;
  laneInterval = setInterval(function () {
    steps += dx;
    // if (temp === 0) {
    //   that.x -= dx;
    // } else {
    //   that.x += dx;
    // }
    // that.draw();
    if (steps >= 35) {
      clearInterval(laneInterval);
      audio.pause();
      this.element.style.transform = 'rotate(0deg)';
    }
  }.bind(this), 23);

}


function Game(parentElement) {
  this.roadElements = [];
  this.otherCar = [];
  this.obstacleIndex = [];
  this.highScore = 0;
  this.highScoreContainer = null;
  this.bullets = [];



  Game.prototype.init = function () {
    this.highScore = localStorage.getItem('highScore');

    //creating main car
    mainCar = new Car(parentElement, 10, 655).createCar();
    mainCar.moveToMiddleLane();
    console.log(mainCar);

    //creating score element
    scoreContainer = document.createElement('div');
    scoreContainer.classList.add('score-top');
    scoreContainer.innerText = '0';
    parentElement.appendChild(scoreContainer)
    //creating high score element
    var highScoreCont = document.createElement('div');
    highScoreCont.classList.add('high-score');
    highScoreCont.innerText = this.highScore;
    parentElement.appendChild(highScoreCont);
    this.highScoreContainer = highScoreCont;

    //road asset creation
    for (var i = 0; i < 3; i++) {
      var lane = new Road(parentElement, 0, (270 + 50) * i)
      lane.create();
      this.generateObstacle(i);
      this.roadElements.push(lane);
    }
    this.animateLane();
    //car A D and event handler

    document.addEventListener("keypress", function (event) {
      console.log("key press");
      //  console.log(mainCar);

      //a=97 d =100
      //for a event handling
      // if (gameStopFlag) {
      if (event.keyCode == 97 && mainCar.currentLane != 1) {
        //console.log("moving to left");
        mainCar.steerLeft();

      }
      if (event.keyCode == 100 && mainCar.currentLane != 3) {
        // console.log("moving to right");
        mainCar.steerRight();
      }

      if (event.keyCode == 32) {
        console.log("bullet fire")
        //fire bullet
        var bullet = new Bullet(mainCar.x, mainCar.y, parentElement).create();
        bullet.fire();
        this.bullets.push(bullet);

        //check collision
      }

    }.bind(this));

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
    }.bind(this));



    this.generateObstacle(0, car.currentRoadSegment);
    counter = (counter + 1) % 3;
  }

}



Game.prototype.animateLane = function () {
  var that = this;


  gameLoop = setInterval(function () {
    //make car move faster after each 15 sec

    if (gameTime % 500 == 0) {
      UPDATE_Y += 0.5;
    }

    this.roadElements.forEach(function (roadElement, index) {
      if (roadElement.y >= 785) {
        roadElement.y = -200; //reset y into intial position
      }
      roadElement.moveY();
    }.bind(this));

    this.otherCar.forEach(function (car, otherCarIndex) {

      this.checkCollision(mainCar, car, 0);
      if (this.bullets.length != 0) {
        //  console.log("checking bullet");
        this.bullets.forEach(function (element, index) {
          this.checkCollision(element, car, 1);
        }.bind(this));
      }

      if (car.y >= 785 + 220) {
        gameScore += 5;
        scoreContainer.innerText = gameScore;
        this.updateObstaclePosition(car);
      }

      car.moveY(); //update position

    }.bind(this));

    //checking collision 
    //update game time
    gameTime += Math.ceil((1000 / FPS) / 1000);
  }.bind(this), 1000 / FPS);

}



Game.prototype.checkCollision = function (mainObject, otherCar, flag) {

  //flag 0 checking main car with others 1 bullet and other cars
  var mainObject = mainObject;
  console.log("collision checking" + mainObject)

  if (mainObject.x < otherCar.x + otherCar.width &&
    mainObject.x + mainObject.width > otherCar.x &&
    mainObject.y < otherCar.y + otherCar.height &&
    mainObject.y + otherCar.height > otherCar.y) {
    console.log('impact')
    if (flag == 0) {
      //terminate game
      playSFX('./audio/car-crash.ogg', false)
      clearInterval(laneInterval);
      console.log("collision")
      gameStopFlag = false;
      //move to
      clearInterval(gameLoop);
      //showing game over screen
      tryAgainContainer();
      this.storeScore();
    }
    if (flag == 1) {
      //bullet impact with other object
      //  console.log("bullet impact");

      //remove other car from list and dom
      this.otherCar = this.otherCar.filter(function (element) {
        return element != otherCar;
      }.bind(this));
      otherCar.element.remove();


      this.bullets = this.bullets.filter(function (element) {
        return element != mainObject;
      }.bind(this));
      mainObject.element.remove();


      //remove bullet from bullet list and dom
    }


  }

}

Game.prototype.storeScore = function () {

  var prevScore = parseInt(localStorage.getItem('highScore'));
  console.log('prevstorage', prevScore);

  if (gameScore > prevScore) {
    localStorage.setItem('highScore', gameScore);
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

    console.log("start")
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
    // var allElement = parentElement.querySelectorAll('div');
    // console.log(allElement);
    // allElement.forEach(function (element) {
    //   element.remove();
    // });
    // startScreen()
    location.reload();

  });



}

startScreen();