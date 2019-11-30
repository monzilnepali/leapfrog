var boxes = [];
var SCORE_VALUE = 10;
var score = 0;
var scoreDiv = null;
var count = 0;
var animate = null;
var timerCounter = null;
var parentContainer = null;

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}


function removeElement(index) {
  boxes = boxes.filter(function (value) {
    console.log("chekcing" + value.index + "!=" + index)
    return value.index !== index;
  });
}

function updateScore() {

  score += SCORE_VALUE;
  scoreDiv.innerText = score;
  if (score == count * SCORE_VALUE) {
    terminate()
  }

}



function Box(parentElement, width, height, index) {
  this.x = 10;
  this.y = 10;
  this.dx = 2;
  this.dy = 2;
  this.speed = 1;
  this.width = width;
  this.height = height;
  this.element = null;
  this.parentElement = parentElement;
  this.index = index;


  this.init = function () {
    var box = document.createElement('div');
    var antImg = document.createElement('img');
    box.style.width = this.width + 'px';
    box.style.height = this.height + 'px';
    antImg.setAttribute('src', "./images/ant2.png");
    box.appendChild(antImg);
    box.classList.add('box');
    this.parentElement.appendChild(box);
    this.element = box;
    this.element.onclick = this.boxClicked.bind(this);
    return this;

  }

}

Box.prototype.boxClicked = function () {
  //pop up score
  var x = this.x;
  var y = this.y;
  console.log(x + "," + y)
  var popup = document.createElement('span');
  popup.classList.add('point');
  popup.style.left = x + "px";
  popup.style.top = y + "px";
  popup.innerText = "10";
  this.parentElement.appendChild(popup)
  updateScore();
  //create blood at ant positio
  var bloodImg = document.createElement('img');
  bloodImg.style.left = x + "px";
  bloodImg.style.top = y + "px";
  bloodImg.style.width = "55px";
  bloodImg.style.height = "55px";
  bloodImg.style.position = "absolute";
  bloodImg.setAttribute('src', './images/blood.png')
  this.parentElement.appendChild(bloodImg);
  setTimeout(function () {
    //remove the pop up score element after 500ms

    //  this.parentElement.removeChild(popup);
    popup.style.display = 'none';

  }, 500);
  //remove ant from game array of box
  removeElement(this.index);
  //removing eleent from DOM 
  this.parentElement.removeChild(this.element);

}

//setting position
Box.prototype.setPosition = function (x, y) {
  this.x = x;
  this.y = y;
}
Box.prototype.changebg = function () {
  this.element.style.backgroundColor = "green"
}

Box.prototype.draw = function () {
  this.element.style.left = this.x + 'px';
  this.element.style.top = this.y + 'px';
}
Box.prototype.changeSpeed = function (speed) {
  this.speed = speed;
}

Box.prototype.move = function () {
  this.x += this.dx * this.speed;
  this.y += this.dy * this.speed;
  this.rotate();
  this.draw();
}
Box.prototype.changeX = function () {
  this.dx *= -1;
}
Box.prototype.changeY = function () {
  this.dy *= -1;
}
Box.prototype.checkBorderCollisionX = function () {
  if (this.x + this.dx > (1000 - this.width) || this.x + this.dx < 0) {
    return true;
  }
  return false;

}
Box.prototype.checkBorderCollisionY = function () {
  if (this.y + this.dy > (600 - this.height) || this.y + this.y < 0) {
    return true;
  }
  return false;
}

Box.prototype.rotate = function () {

  if (this.dx > 0 && this.dy > 0) {
    this.element.style.transform = 'rotate(' + 135 + 'deg)';
  }
  if (this.dx < 0 && this.dy > 0) {
    this.element.style.transform = 'rotate(' + -135 + 'deg)';
  }
  if (this.dx < 0 && this.dy < 0) {
    this.element.style.transform = 'rotate(' + -45 + 'deg)';
  }
  if (this.dx > 0 && this.dy < 0) {
    this.element.style.transform = 'rotate(' + 45 + 'deg)';
  }

}







function Game(parentElement, boxCount) {

  this.MAX_WIDTH = 1000;
  this.MAX_HEIGHT = 600;
  this.parentElement = parentElement
  parentContainer = this.parentElement;
  count = boxCount || 8;
  this.overlay = null;
  this.startBtn = null;
  this.score = null;
  this.statsDiv = null;
  this.timerDiv = null;
  this.time = 10;




}
Game.prototype.startGame = function () {
  console.log("start btn");
  //removing start btn
  this.parentElement.removeChild(this.startBtn);
  this.parentElement.removeChild(this.overlay);
  //creating scrore
  var stats = document.createElement('div');
  stats.classList.add('game-stats');
  var score = document.createElement('div');
  score.classList.add('score');
  score.innerText = "0";
  scoreDiv = score;
  var timer = document.createElement('div');
  timer.classList.add('timer');
  timer.innerText = this.time + "s";
  this.timerDiv = timer;
  stats.appendChild(score);
  stats.appendChild(timer);
  this.statsDiv = stats;
  this.parentElement.appendChild(stats);
  animate = setInterval(this.moveBoxes.bind(this), 20);
  this.updateTimer();


}
Game.prototype.updateTimer = function () {
  var that = this;
  timerCounter = setInterval(function () {
    that.time--;
    if (that.time == 0) {
      console.log("timerup")
      clearInterval(timerCounter)
      terminate();
    }
    that.timerDiv.innerText = that.time + "s";
  }, 1000);
}

Game.prototype.init = function () {

  //setting score default

  //creating overlay start and score
  var overlay = document.createElement('div');
  overlay.classList.add('overlay');
  this.overlay = overlay;
  var startbtn = document.createElement('div');
  startbtn.classList.add('start-btn');
  startbtn.innerText = "Start";
  this.startBtn = startbtn;
  parentElement.appendChild(overlay);
  parentElement.appendChild(startbtn);
  parentElement.appendChild(overlay);
  this.startBtn.onclick = this.startGame.bind(this);

  var tempLen = count;
  while (tempLen !== 0) {
    var flag = 0;

    var box = new Box(parentElement, 55, 55, tempLen);
    var x1 = getRandomArbitrary(0, this.MAX_WIDTH - box.width);
    var y1 = getRandomArbitrary(0, this.MAX_HEIGHT - box.height);
    var checkBox = boxes;
    for (var j = 0; j < checkBox.length; j++) {
      if (x1 < checkBox[j].width + checkBox[j].x &&
        x1 + box.width > checkBox[j].x &&
        y1 < checkBox[j].y + checkBox[j].height &&
        y1 + box.width > checkBox[j].y) {
        flag = 1; //collide;
        break;
      }
    }
    if (flag === 0) {

      box.init();
      box.setPosition(x1, y1);
      box.draw();
      boxes.push(box);
      tempLen--;
    }


  } //end of drawing
  console.log(boxes)

}
Game.prototype.moveBoxes = function () {
  for (var i = 0; i < boxes.length; i++) {
    //checking collision in wall
    //  console.log(this.boxes[i])
    if (boxes[i].checkBorderCollisionX()) {
      boxes[i].changeX();

    }
    if (boxes[i].checkBorderCollisionY()) {
      boxes[i].changeY();

    }
    boxes[i].move();
    this.CheckCollision(boxes[i], i);
  }
}


Game.prototype.CheckCollision = function (box, index) {

  var x1 = box.x;
  var y1 = box.y;
  var checkBox = boxes;
  for (var j = 0; j < checkBox.length; j++) {
    if (j !== index) {
      //only for other
      if (x1 < checkBox[j].width + checkBox[j].x &&
        x1 + box.width > checkBox[j].x &&
        y1 < checkBox[j].y + checkBox[j].height &&
        y1 + box.width > checkBox[j].y) {
        //  box.changebg();
        // console.log("collide")
        //if fast speed ball hit slow ball
        //slow ball will get little momentum and fast ball loose momentum
        if (box.currentSpeed > checkBox[j].speed) {
          var changeSpeed = (box.currentSpeed - checkBox[j].speed) / 2;
          checkBox[j].changeSpeed(checkBox[j] + changeSpeed);
          box.changeSpeed(box.currentSpeed - changeSpeed);
        }
        checkBox[j].changeX()
        checkBox[j].changeY()
      }
    }
  }


}

function terminate() {

  console.log("game terminate")
  clearInterval(animate);
  clearInterval(timerCounter);
  //clear all dynamic dom element
  console.log(parentContainer)
  score = 0; //reset value
  parentContainer.innerText = "";

  //start new game
  new Game(parentElement).init();

}


var parentElement = document.getElementById('app');
new Game(parentElement).init();