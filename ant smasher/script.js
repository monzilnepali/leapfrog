var boxes = [];
const distance = (x1, y1, x2, y2) => Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))

function removeElement(index) {

  console.log(boxes)

  boxes = boxes.filter(function (value) {
    console.log("chekcing" + value.index + "!=" + index)
    return value.index !== index;
  });


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

    antImg.setAttribute('src', "./images/ant.png");
    box.appendChild(antImg);
    box.classList.add('box');
    this.parentElement.appendChild(box);
    this.element = box;
    this.element.onclick = this.boxClicked.bind(this);
    return this;

  }

}

Box.prototype.boxClicked = function () {

  console.log("clicked");
  console.log(this.index);
  this.element.children[0].setAttribute('src', './images/source.png')
  removeElement(this.index)

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
  if (this.y + this.dy > (700 - this.height) || this.y + this.y < 0) {
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



function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}




function Game(parentElement, boxCount) {

  this.MAX_WIDTH = 1000;
  this.MAX_HEIGHT = 700;
  this.parentElement = parentElement
  this.boxCount = boxCount || 8;
  this.animate;





}

Game.prototype.startGame = function () {
  var tempLen = this.boxCount;
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
  this.animate = setInterval(this.moveBoxes.bind(this), 20);
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
          //  box.changeSpeed(box.currentSpeed - changeSpeed);
        }


        checkBox[j].changeX()
        checkBox[j].changeY()


        //changing directio
      }
    }
  }


}




var parentElement = document.getElementById('app');
new Game(parentElement).startGame();