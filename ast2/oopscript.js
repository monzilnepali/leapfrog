function Carousel(images, IMAGE_WIDTH, imageWrapper, indicatorWrapper, slideNext, slidePrev) {
  this.currentSlideIndex = 0;
  this.images = images;
  this.IMAGE_WIDTH = IMAGE_WIDTH;
  this.IMAGES_LENGTH = images.length;
  this.imageWrapper = imageWrapper;
  this.indicatorWrapper = indicatorWrapper;
  this.slideNext = slideNext;
  this.slidePrev = slidePrev;
  this.speed = 100;
}

Carousel.prototype.createIndicator = function () {
  var indicator = document.getElementById(this.indicatorWrapper);
  for (var i = 0; i < this.IMAGES_LENGTH; i++) {
    var liElement = document.createElement("li");
    liElement.id = "circle" + i;
    var iconElement = document.createElement("i");
    if (i == 0) {
      iconElement.className = "fa fa-circle";

    } else {
      iconElement.className = "fa fa-circle-o";

    }
    liElement.addEventListener("click", function () {
      changeSlide(this);
    });
    liElement.appendChild(iconElement);
    indicator.appendChild(liElement);
  }
  var that = this;

  function changeSlide(selected) {
    var nextSlideIndex = selected.getAttribute("id").split("circle")[1];
    console.log("indicator" + nextSlideIndex);
    if (nextSlideIndex < that.currentSlideIndex) {
      //left slidez
      that.animate(nextSlideIndex);
    } else {
      //right slide
      that.animate(nextSlideIndex);
    }

  }


};

//change indicator of carousel
Carousel.prototype.changeIndicator = function (index) {

  console.log("index>>>>" + index)
  var indicator = document.getElementById(this.indicatorWrapper).children;
  //console.log(indicator[index].childNodes[0])
  indicator[index].childNodes[0].className = "fa fa-circle";
  indicator[this.currentSlideIndex].childNodes[0].className = "fa fa-circle-o";
  // indicator.getElementById("circle" + this.currentSlideIndex).className = "fa fa-circle-o";
  //changing class name
  // indicator.getElementById("circle" + index).className = "fa fa-circle";
};

//slide
Carousel.prototype.animate = function (nextSlideIndex) {
  this.changeIndicator(nextSlideIndex);
  var currentWrapper = this.currentSlideIndex * this.IMAGE_WIDTH;
  var nextWrapper = nextSlideIndex * this.IMAGE_WIDTH;
  var diff = Math.abs(currentWrapper - nextWrapper);
  var flag = (nextWrapper > currentWrapper) ? true : false; //for left and right animate
  console.log("dif>>>>>>" + diff);
  var step = Math.abs(this.currentSlideIndex - nextSlideIndex)
  // console.log("Step"+step)
  var totalstep = diff / (this.speed * step);
  console.log("total step" + totalstep)
  // console.log("from"+this.currentSlideIndex+"to"+nextSlideIndex)
  console.log("current wrapperid >>>>>" + this.currentSlideIndex)
  console.log("next wrapperid >>>>>" + nextSlideIndex)
  var wrapper = document.getElementsByClassName(this.imageWrapper)[0];
  var that = this;
  var intervalTime = setInterval(function () {
    if (flag) {
      if (nextSlideIndex == 0) {
        //backward slide
        console.log("going back")
        currentWrapper -= 100 * step;
      } else {
        currentWrapper += 100 * step;
      }
    } else {
      if (nextSlideIndex == that.images.length - 1) {
        currentWrapper += 100 * step;
      } else {
        currentWrapper -= 100 * step;
      }
    }
    console.log("iamge wrapper" + wrapper)
    wrapper.style.left = -currentWrapper + "px";
    console.log("currentwrapper-------->" + currentWrapper);
  }, 30);

  setTimeout(function () {
    console.log("stop animation")
    clearInterval(intervalTime);
  }, totalstep * 30);

  this.currentSlideIndex = nextSlideIndex;
};
//initalize the carousel
Carousel.prototype.init = function () {
  //styling image
  for (var i = 0; i < this.images.length; i++) {
    this.images[i].style.left = this.IMAGE_WIDTH * i + "px";
  }
  //create indicator
  this.createIndicator();
  //adding event handler for prev and next
  this.slidePrev.onclick = this.prevImage.bind(this);
  this.slideNext.onclick = this.nextImage.bind(this);
  //auto slide
  var loop = 1;
  var that = this;

};
//set indicator
Carousel.prototype.setIndicator = function (index) {
  this.changeIndicator(index);
}
//onlick slidePrev 
Carousel.prototype.prevImage = function () {
  var nextSlideIndex = (this.currentSlideIndex + this.images.length - 1) % this.images.length;
  // this.slideleft(nextSlideIndex);
  this.animate(nextSlideIndex);
}
//onlick slideNext
Carousel.prototype.nextImage = function () {
  var diff = parseInt(this.currentSlideIndex) + 1;
  var nextSlideIndex = (diff) % this.images.length;
  this.animate(nextSlideIndex);
}

Carousel.prototype.autoAnimate = function () {
  setInterval(() => {
    this.nextImage();
  }, 2300);
}

//getting list images from dom
var images1 = document.getElementsByClassName('carousel-image-wrapper1')[0].children;
var prevSlide1 = document.getElementById("prevSlide1");
var nextSlide1 = document.getElementById("nextSlide1");
var first = new Carousel(images1, 1200, "carousel-image-wrapper1", "carousel-indicator1", nextSlide1, prevSlide1);
first.init();
first.autoAnimate();


var images2 = document.getElementsByClassName('carousel-image-wrapper2')[0].children;
var prevSlide2 = document.getElementById("prevSlide2");
var nextSlide2 = document.getElementById("nextSlide2");
var second = new Carousel(images2, 1200, "carousel-image-wrapper2", "carousel-indicator2", nextSlide2, prevSlide2);
second.init();
second.autoAnimate();