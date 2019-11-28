//
function Carousel(images, IMAGE_WIDTH, imageWrapper, indicatorWrapper, slideNext, slidePrev) {
  this.currentSlideIndex = 0;
  this.images = images;
  this.IMAGE_WIDTH = IMAGE_WIDTH;
  this.IMAGES_LENGTH = images.length;
  this.imageWrapper = imageWrapper;
  this.indicatorWrapper = indicatorWrapper;
  this.slideNext = slideNext;
  this.slidePrev = slidePrev;
  this.speed=100;
}

Carousel.prototype.createIndicator = function () {
  var indicator = document.getElementById(this.indicatorWrapper);
  for (var i = 0; i < this.IMAGES_LENGTH; i++) {
    var liElement = document.createElement("li");
    liElement.id = "circle" + i;
    var iconElement = document.createElement("i");
    iconElement.className = "fa fa-circle-o";
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
      that.slideleft(nextSlideIndex);
    } else {
      //right slide
      that.slideRight(nextSlideIndex);
    }

  }


};

//change indicator of carousel
Carousel.prototype.changeIndicator = function (index) {
  document.getElementById("circle" + this.currentSlideIndex).childNodes[0].className = "fa fa-circle-o";
  //changing class name
  document.getElementById("circle" + index).childNodes[0].className = "fa fa-circle";
};


//slide to left
// Carousel.prototype.slideleft = function (nextSlideIndex) {
//   var currentWrapper = this.currentSlideIndex * this.IMAGE_WIDTH;
//   var nextWrapper = nextSlideIndex * this.IMAGE_WIDTH;
//   console.log("currentwrapper>>" + currentWrapper);
//   this.changeIndicator(nextSlideIndex);
//   var intervalTime = setInterval(function () {
//     if (nextSlideIndex == images.length - 1) {
//       currentWrapper += 100;
//     } else {
//       currentWrapper -= 100;
//     }
//     document.getElementsByClassName("carousel-image-wrapper")[0].style.left = -currentWrapper + "px";
//     console.log("currentwrapper>>" + currentWrapper);
//     console.log("next wrapper" + nextWrapper);
//     if (nextSlideIndex == images.length - 1) {
//       if (currentWrapper >= nextWrapper) {
//         clearInterval(intervalTime);
//       }
//     } else {
//       if (currentWrapper <= nextWrapper) {
//         clearInterval(intervalTime);
//       }
//     }
//   }, 30);
//   this.currentSlideIndex = nextSlideIndex;
// };

//slide
Carousel.prototype.animate = function (nextSlideIndex) {
  this.changeIndicator(nextSlideIndex);
  var currentWrapper = this.currentSlideIndex * this.IMAGE_WIDTH;
  var nextWrapper = nextSlideIndex * this.IMAGE_WIDTH;
  var diff= Math.abs(currentWrapper-nextWrapper);
  var flag=(nextWrapper>currentWrapper)?true:false;//for left and right animate
//  console.log("dif>>>>>>"+ diff);
  var step=Math.abs(this.currentSlideIndex-nextSlideIndex)
 // console.log("Step"+step)
  var totalstep=diff/(this.speed*step);
 // console.log("total step"+totalstep)
 // console.log("from"+this.currentSlideIndex+"to"+nextSlideIndex)
  console.log("current wrapperid >>>>>"+this.currentSlideIndex)
  console.log("next wrapperid >>>>>"+nextSlideIndex)

  var intervalTime = setInterval(function () {
    if(flag){
      if (nextSlideIndex==0) {
        //backward slide
        console.log("going back")
        currentWrapper -= 100*step;
      } else {
        currentWrapper += 100*step;
      }
    }else{
      if (nextSlideIndex == this.images.length - 1) {
        currentWrapper += 100;
      } else {
        currentWrapper -= 100;
      }
    }
   
    document.getElementsByClassName("carousel-image-wrapper")[0].style.left = -currentWrapper + "px";
     console.log("currentwrapper-------->" + currentWrapper);
    // console.log("next wrapper---------->" + nextWrapper);

    // if (nextSlideIndex == 0) {
    //   if (currentWrapper <= nextWrapper) {
    //     clearInterval(intervalTime);
    //   }
    // } else {
    //   if (currentWrapper >= nextWrapper) {
    //     clearInterval(intervalTime);
    //   }
    // }
  }, 30);

  setTimeout(function(){ 
    console.log("stop animation")
    clearInterval(intervalTime); 
  }, totalstep*30);

  this.currentSlideIndex = nextSlideIndex;
};

Carousel.prototype.init = function () {
  //styling image
  for (var i = 0; i < images.length; i++) {
    images[i].style.left = this.IMAGE_WIDTH * i + "px";
  }
  //create indicator
  this.createIndicator();
  this.changeIndicator(this.currentSlideIndex);
  //adding event handler for prev and next
  this.slidePrev.onclick = this.prevImage.bind(this);
  this.slideNext.onclick = this.nextImage.bind(this);
};
//onlick slidePrev 
Carousel.prototype.prevImage = function () {
  var nextSlideIndex = (this.currentSlideIndex + images.length - 1) % this.images.length;
  // this.slideleft(nextSlideIndex);
  this.animate(nextSlideIndex);
}
//onlick slideNext
Carousel.prototype.nextImage = function () {
  var diff= parseInt(this.currentSlideIndex)+1;
  var nextSlideIndex = (diff) % this.images.length;
  this.animate(nextSlideIndex);
}

//getting list images from dom
var images = document.getElementsByTagName("img");
var prevSlide = document.getElementById("prevSlide");
var nextSlide = document.getElementById("nextSlide");
var first = new Carousel(images, 1200, "carousel-image-wrapper", "carousel-indicator", nextSlide, prevSlide);
first.init();
