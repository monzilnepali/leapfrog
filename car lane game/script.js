var WIDTH = 804;
var HEIGHT = 780;
var LANE_SHIFT = 72 * 2;
var LEFT_LANE_POSITION = (157 + 72);
var MIDDLE_LANE_POSITION = LEFT_LANE_POSITION + LANE_SHIFT;
var RIGHT_LANE_POSITION = MIDDLE_LANE_POSITION + LANE_SHIFT;
var FPS = 60;
var carHeight = 110;
var carWidth = 55;
var laneIndex = ['001', '010', '100', '011', '101'];

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
// Bullet.prototype.move = function () {
//   this.y -= 10;
//   this.draw();
// }
Bullet.prototype.draw = function () {
  this.element.style.top = this.y + 'px';
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

Road.prototype.draw = function () {
  this.element.style.top = this.y + 'px';
}


function Car(parentElement, x, y, flag, width, height) {
  this.x = x;
  this.y = y;
  this.width = width || 52;
  this.height = height || 105;
  this.element = null;
  this.currentLane = 0;
  this.parent = parentElement;
  this.flag = flag || 0; //0 mean main car and 1 mean obstacle car
}
Car.prototype.createCar = function () {
  var car = document.createElement('div');
  switch (this.flag) {
    case 0:
      car.classList.add('main-car');
      break;
    case 1:
      car.classList.add('other-car');
      var randomCar = Math.floor(Math.random() * 5) + 1;
      car.style.backgroundImage = 'url(./images/assets/car-' + randomCar + '.png)';
      break;
    case 2:
      car.classList.add('ammo-box');
      break;

  }
  car.style.left = this.x + 'px';
  car.style.top = this.y + 'px';
  car.style.width = this.width + 'px';
  car.style.height = this.height + 'px';
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
    this.element.style.transform = 'rotate(-30deg)';
    this.laneSwitchAnimation(0);
    this.draw();

  }


}

Car.prototype.steerRight = function () {
  //if current lane index =3 mean end of road from right side
  if (this.currentLane != 3) {
    this.x = this.x + LANE_SHIFT;
    this.currentLane = this.currentLane + 1;
    this.element.style.transform = 'rotate(30deg)';
    this.laneSwitchAnimation(1);
    this.draw();

  }
}

Car.prototype.laneSwitchAnimation = function (temp) {
  var audio = playSFX('./audio/cardrift.mp3', false);
  var steps = 0;
  var dx = 6;
  var laneInterval = setInterval(function () {
    steps += dx;

    if (steps >= 35) {
      clearInterval(laneInterval);
      audio.pause();
      this.element.style.transform = 'rotate(0deg)';
    }
  }.bind(this), 23);

}


function Game(parentElement) {
  this.mainCar = null;
  this.parentElement = parentElement;
  this.roadElements = [];
  this.otherCar = [];
  this.highScore = 0;
  this.bullets = [];
  this.gameLoop = null;
  this.speed = 7;
  this.bulletSpeed = 8;
  this.gameScore = 0;
  this.scoreContainer = null;
  this.highScoreContainer = null;
  this.ammoValueContainer = null;
  this.totalAmmo = 0;
  this.pointElement = null;
  this.gameStopFlag = false;
  this.gameTime = 0;


  Game.prototype.init = function () {
    this.highScore = localStorage.getItem('highScore');
    var mainCarElement = new Car(this.parentElement, 10, 655, 0, 53, 132).createCar();
    mainCarElement.moveToMiddleLane();
    this.mainCar = mainCarElement;
    var pointPop = document.createElement('div');
    pointPop.classList.add('points');
    this.parentElement.appendChild(pointPop);
    this.pointElement = pointPop;



    //creating score element
    var scoreContainer = document.createElement('div');
    scoreContainer.classList.add('score-top');
    scoreContainer.innerText = '0';
    this.scoreContainer = scoreContainer;
    this.parentElement.appendChild(scoreContainer)
    //creating high score element
    var highScoreCont = document.createElement('div');
    highScoreCont.classList.add('high-score');
    highScoreCont.innerText = this.highScore;
    this.parentElement.appendChild(highScoreCont);
    this.highScoreContainer = highScoreCont;


    var ammoContainer = document.createElement('div');
    ammoContainer.classList.add('ammo-container');
    ammoContainer.innerText = "0";
    this.parentElement.appendChild(ammoContainer);
    this.ammoValueContainer = ammoContainer;

    //road asset creation
    for (var i = 0; i < 3; i++) {
      var lane = new Road(this.parentElement, 0, (270 + 50) * i)
      lane.create();
      if (i == 0) {
        this.generateObstacle(i);
      }
      this.roadElements.push(lane);
    }


    this.animateLane();
    //car A D and event handler

    document.addEventListener("keypress", function (event) {

      //a=97 d =100

      if (!this.gameStopFlag) {
        if (event.keyCode == 97 && this.mainCar.currentLane != 1) {
          //console.log("moving to left");
          this.mainCar.steerLeft();
        }
        if (event.keyCode == 100 && this.mainCar.currentLane != 3) {
          // console.log("moving to right");
          this.mainCar.steerRight();
        }
        if (event.keyCode == 32) {

          //checking if there is bullet available
          if (this.totalAmmo != 0) {
            console.log("bullet fire");
            var bullet = new Bullet(this.mainCar.x, this.mainCar.y, this.parentElement).create();
            //bullet.fire();
            this.bullets.push(bullet);
            this.totalAmmo--;
            this.ammoValueContainer.innerText = this.totalAmmo;
          }


        }
      }
    }.bind(this));

  }
}


Game.prototype.animateLane = function () {
  this.gameLoop = setInterval(function () {
    //make car move faster after each 15 sec

    if (this.gameTime % 1000 <= 50) {
      this.speed += 0.005;
      // console.log("time" + Math.floor(this.gameTime / 1000) + "second");
    }


    this.roadElements.forEach(function (roadElement, index) {
      if (roadElement.y >= 790) {
        roadElement.y = -170; //reset y into intial position
        if (this.gameTime % 128 == 0) {
          //generate ammo element
          this.generateObstacle(2, 2); //2 =amm0 generation
          console.log("ammo created")
        } else {
          this.generateObstacle(2);
        }
        //  console.log("obstacle generated")


      }
      roadElement.y += this.speed;
      roadElement.draw();

    }.bind(this));

    this.otherCar.forEach(function (car, otherCarIndex) {
      this.checkCollision(this.mainCar, car, 0);

      if (this.bullets.length != 0) {
        //  console.log("checking bullet");
        this.bullets.forEach(function (bullet, index) {
          bullet.y -= this.speed;
          bullet.draw();
          if (bullet.x == car.x) {
            this.checkCollision(bullet, car, 1);
          }

          if (bullet.y <= 20) {
            console.log("bullet removed")
            //remove the bullet element
            this.bullets = this.bullets.filter(function (element1) {
              return element1 != bullet;
            }.bind(this));
            bullet.element.remove();


          }

        }.bind(this));
      }
      if (car.y >= 800) {
        //remove car
        car.element.remove();
        this.otherCar = this.otherCar.filter(function (element) {
          return element != car;
        }.bind(this));


      }

      if (this.otherCar.length == 0) {
        //regenerate all car
        console.log("car regneraterd")
        for (var i = 0; i < 2; i++) {
          this.generateObstacle(i);

        }
      }
      car.y += this.speed
      car.draw(); //update position

    }.bind(this));
    //if bullet y=0 then remove it


    //update game time
    this.gameTime += Math.floor((1000 / FPS));
  }.bind(this), Math.floor(1000 / FPS));

}


Game.prototype.generateObstacle = function (index, flag) {
  //flag =0 maincar ,1 obstacles and 2 ammo box
  var flag = flag || 1;
  var pattern = [];

  if (flag == 1) {
    var random = Math.floor(Math.random() * 5);
    pattern = laneIndex[random].split("");
  } else if (flag == 2) {
    var random = Math.floor(Math.random() * 3);
    pattern = laneIndex[random].split("");
  }



  for (var i = 2; i >= 0; i--) {
    //creating max two car object in single lane element
    if (parseInt(pattern[i]) === 1) {
      //create car if pattern value =1
      var car = null;
      if (flag == 2) {
        car = new Car(this.parentElement, 0, -200 * index, flag, 60, 60).createCar();
      } else {
        car = new Car(this.parentElement, 0, -200 * index, flag).createCar();
      }

      this.otherCar.push(car);
      //shifting position
      switch (i) {
        case 0:
          car.moveToLeftLane();
          break;
        case 1:
          car.moveToMiddleLane();
          break;
        case 2:
          car.moveToRightLane();
          break;
      }

    }

  }


}



Game.prototype.checkCollision = function (mainObject, otherCar, flag) {

  //flag 0 checking main car with others 1 bullet and other cars
  var mainObject = mainObject;
  if (mainObject.x < otherCar.x + otherCar.width &&
    mainObject.x + mainObject.width > otherCar.x &&
    mainObject.y < otherCar.y + otherCar.height &&
    mainObject.y + otherCar.height > otherCar.y) {

    if (flag == 0) {
      if (otherCar.flag == 1) {
        clearInterval(this.gameLoop);
        //terminate game
        playSFX('./audio/car-crash.ogg', false)

        this.gameStopFlag = true;
        //move to
        //showing game over screen
        tryAgainContainer();
        this.storeScore();
      } else if (otherCar.flag == 2) {
        //ammo increase
        this.totalAmmo += 1;
        console.log("poinst up");
        this.ammoValueContainer.innerText = this.totalAmmo;
        this.otherCar = this.otherCar.filter(function (element) {
          return element != otherCar;
        }.bind(this));
        otherCar.element.remove();
      }
    }
    if (flag == 1 && otherCar.flag == 1) {
      //removing event listenter

      //bullet impact with other object

      //create point element
      this.pointElement.style.left = (otherCar.x + otherCar.width / 2 - 10) + 'px';
      this.pointElement.style.top = (otherCar.y + otherCar.height / 2) + 'px';
      this.pointElement.style.display = 'block';
      this.pointElement.innerText = '+5';
      setTimeout(function () {
        this.pointElement.style.display = 'none';
      }.bind(this), 210);

      //increase point
      this.gameScore += 5;
      this.scoreContainer.innerText = this.gameScore;
      //remove other car from list and dom
      this.otherCar = this.otherCar.filter(function (element) {
        return element != otherCar;
      }.bind(this));
      otherCar.element.remove();


      this.bullets = this.bullets.filter(function (element) {
        return element != mainObject;
      }.bind(this));
      mainObject.element.remove();



    }


  }

}

Game.prototype.storeScore = function () {

  var prevScore = parseInt(localStorage.getItem('highScore'));
  console.log('prevstorage', prevScore);

  if (this.gameScore > prevScore) {
    localStorage.setItem('highScore', this.gameScore);
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
  console.log("try again called")
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
  //scoreValue.innerText = gameScore;
  var tryAgain = document.createElement('div');
  tryAgain.classList.add('try-again');

  mainWrapper.appendChild(heading);
  mainWrapper.appendChild(subHeading);
  mainWrapper.appendChild(scoreValue);
  mainWrapper.appendChild(tryAgain);

  mainContainer.appendChild(mainWrapper);
  parentElement.appendChild(mainContainer);

  tryAgain.addEventListener('click', function () {
    var allElement = parentElement.querySelectorAll('div');
    console.log(allElement);
    allElement.forEach(function (element) {
      element.remove();
      // });
    });
    startScreen()



  });
}
startScreen();