function Box(parentElement, width, height, speed) {
  this.x = 10;
  this.y = 10;
  this.dx = 5;
  this.dy = 5;
  this.speed = speed;
  this.width = width;
  this.height = height;
  this.element = null;
  this.backgroundColor = "#F31806";
  this.parentElement = parentElement;


  this.init = function () {
    var box = document.createElement('div');
    box.style.width = this.width + 'px';
    box.style.height = this.height + 'px';
    box.style.backgroundColor = this.backgroundColor;
    box.classList.add('box');
    this.parentElement.appendChild(box);
    this.element = box;
    return this;

  }

}

//setting position
Box.prototype.setPosition = function (x, y) {
  this.x = x;
  this.y = y;
}

Box.prototype.draw = function () {
  this.element.style.left = this.x + 'px';
  this.element.style.top = this.y + 'px';
}

Box.prototype.move = function () {
  this.x += this.dx;
  this.y += this.dy;
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
  if (this.y + this.dy > (700 - this.height) || this.y + this.y < 0) {
    return true;
  }
  return false;
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function Game(parentElement, boxCount) {
  this.boxes = [];
  this.MAX_WIDTH = 1000;
  this.MAX_HEIGHT = 700;
  this.parentElement = parentElement
  this.boxCount = boxCount || 15;
}
Game.prototype.startGame = function () {

  var tempLen = this.boxCount;
  while (tempLen !== 0) {
    var flag = 0;

    var box = new Box(parentElement, 50, 50, 1);
    var x1 = getRandomArbitrary(0, this.MAX_WIDTH - box.width - 5);
    var y1 = getRandomArbitrary(0, this.MAX_HEIGHT - box.height - 5);
    var checkBox = this.boxes;
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
      this.boxes.push(box);
      tempLen--;
    }


  } //end of drawing
  setInterval(this.moveBoxes.bind(this), 20);
}
Game.prototype.moveBoxes = function () {
  for (var i = 0; i < this.boxCount; i++) {
    //checking collision in wall
    console.log(this.boxes[i])
    if (this.boxes[i].checkBorderCollisionX()) {
      this.boxes[i].changeX();
    }

    if (this.boxes[i].checkBorderCollisionY()) {
      this.boxes[i].changeY();
    }
    this.boxes[i].move();
    this.CheckCollision(this.boxes[i], i);
  }
}

Game.prototype.CheckCollision = function (box, index) {

  var x1 = box.x;
  var y1 = box.y
  var checkBox = this.boxes;
  for (var j = 0; j < checkBox.length; j++) {
    if (j !== index) {
      //only for other
      if (x1 < checkBox[j].width + checkBox[j].x &&
        x1 + box.width > checkBox[j].x &&
        y1 < checkBox[j].y + checkBox[j].height &&
        y1 + box.width > checkBox[j].y) {
        console.log("collide")
        checkBox[j].changeX()
        checkBox[j].changeY()


        //changing directio
      }
    }
  }


}


var parentElement = document.getElementById('app');
new Game(parentElement).startGame();