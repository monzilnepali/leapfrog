
; (function () {
    function Box(parentElement) {
      this.x = 10;
      this.y = 10;
      this.speed = 1;
      this.width = 20;
      this.height = 20;
      this.element = null;
      this.parentElement = parentElement;
      var that = this;
  
      this.init = function () {
        var box = document.createElement('div');
        box.style.height = this.height + 'px';
        box.style.width = this.width + 'px';
        box.classList.add('box');
        this.parentElement.appendChild(box);
        this.element = box;
        this.element.onclick = this.boxClicked.bind(this);
        this.draw();
  
        return this;
      }
  
      this.setPostion = function(x, y) {
        this.x = x;
        this.y = y;
      }
  
      this.boxClicked = function () {
        console.log('boxClicked', this.width);
      }
  
      this.draw = function () {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
      }
      
      this.move = function() {
        this.x += this.speed;
        this.y += this.speed;
        this.draw();
      }
  
      // this.checkCollision = function(boxes) {
      //   return true;
      // }
    }
    
    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }
  
    function Game(parentElement, boxCount) {
      var boxes = [];
      var MAX_WIDTH = 500;
      var MAX_HEIGHT = 500;
      this.parentElement = parentElement;
      this.boxCount = boxCount || 10;
  
      this.startGame = function() {
        for(var i=0; i < this.boxCount; i++) {
          var box = new Box(parentElement).init();
          box.setPostion(
            getRandomArbitrary(0, MAX_WIDTH),
            getRandomArbitrary(0, MAX_HEIGHT)
          )
          box.draw();
          boxes.push(box);
        }
  
        setInterval(this.moveBoxes.bind(this), 100)
      }
  
      this.moveBoxes = function() {
        for(var i=0; i< this.boxCount; i++) {
          boxes[i].move();
          // boxes[i].checkCollision(boxes)
        }
      }
    }
  
    var parentElement = document.getElementById('app');
  
    new Game(parentElement).startGame();
  })();