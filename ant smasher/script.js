function Box(parentElement, width, height, speed) {
  this.x = 10;
  this.y = 10;
  this.dx = 5;
  this.dy = 5;
  this.speed = Math.random() || 0.1;
  this.width = width;
  this.height = height;
  this.element = null;
  this.parentElement = parentElement;


  this.init = function () {
    var box = document.createElement('div');
    var antImg = document.createElement('img');
    box.style.width = this.width + 'px';
    box.style.height = this.height + 'px';
    antImg.setAttribute('src', "https://www.animatedimages.org/data/media/183/animated-ant-image-0071.gif");
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
  this.boxes = [];
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
  this.animate = setInterval(this.moveBoxes.bind(this), 20);
}
Game.prototype.moveBoxes = function () {
  for (var i = 0; i < this.boxCount; i++) {
    //checking collision in wall
    //  console.log(this.boxes[i])
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
  var y1 = box.y;
  var checkBox = this.boxes;
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
// var boundary = new Rect(500, 350, 1000, 700);
// var q = new QuadTree(boundary, 4);
// console.log(q)


function Rect(centerx, centery, w, h) {
  this.x = centerx;
  this.y = centery;
  this.width = w;
  this.height = h;
}


function QuadTree(boundary, capacity) {
  this.boundary = boundary;
  this.capacity = capacity;
  this.boxes = [];
  this.nodes = []; //quadrant


}
QuadTree.prototype.split = function () {
  var subWidth = Math.round(this.boundary.width / 2);
  var subHeignt = Math.round(this.boundary.height / 2);
  var x = Math.round(this.boundary.x / 2);
  var y = Math.round(this.boundary.x / 2);

  //top right node
  this.nodes[0] = new Quadtree({
    x: x + subWidth,
    y: y,
    width: subWidth,
    height: subHeight
  }, 4);

  //top left node
  this.nodes[1] = new Quadtree({
    x: x,
    y: y,
    width: subWidth,
    height: subHeight
  }, 4);

  //bottom left node
  this.nodes[2] = new Quadtree({
    x: x,
    y: y + subHeight,
    width: subWidth,
    height: subHeight
  }, 4);

  //bottom right node
  this.nodes[3] = new Quadtree({
    x: x + subWidth,
    y: y + subHeight,
    width: subWidth,
    height: subHeight
  }, 4);


};
//Determine which node the object belongs to
QuadTree.prototype.getIndex = function (pRect) {

  var index = -1,
    verticalMidpoint = this.boundary.x + (this.boundary.width / 2),
    horizontalMidpoint = this.boundary.y + (this.boundary.height / 2),

    //pRect can completely fit within the top quadrants
    topQuadrant = (pRect.y < horizontalMidpoint && pRect.y + pRect.height < horizontalMidpoint),

    //pRect can completely fit within the bottom quadrants
    bottomQuadrant = (pRect.y > horizontalMidpoint);

  //pRect can completely fit within the left quadrants
  if (pRect.x < verticalMidpoint && pRect.x + pRect.width < verticalMidpoint) {
    if (topQuadrant) {
      index = 1;
    } else if (bottomQuadrant) {
      index = 2;
    }

    //pRect can completely fit within the right quadrants	
  } else if (pRect.x > verticalMidpoint) {
    if (topQuadrant) {
      index = 0;
    } else if (bottomQuadrant) {
      index = 3;
    }
  }

  return index;
};


QuadTree.prototype.insert = function (pRect) {

  var i = 0,
    index;

  //if we have subnodes ...
  if (typeof this.nodes[0] !== 'undefined') {
    index = this.getIndex(pRect);

    if (index !== -1) {
      this.nodes[index].insert(pRect);
      return;
    }
  }

  this.objects.push(pRect);

  if (this.objects.length > this.max_objects && this.level < this.max_levels) {

    //split if we don't already have subnodes
    if (typeof this.nodes[0] === 'undefined') {
      this.split();
    }

    //add all objects to there corresponding subnodes
    while (i < this.objects.length) {

      index = this.getIndex(this.objects[i]);

      if (index !== -1) {
        this.nodes[index].insert(this.objects.splice(i, 1)[0]);
      } else {
        i = i + 1;
      }
    }
  }
};