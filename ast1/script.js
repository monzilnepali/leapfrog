window.onload = function() {
  var images = document.getElementsByTagName("img");
  var imageslen = images.length;
  console.log(images);
  IMAGE_WIDTH = 1200;

  currentSlideIndex = 0;
  for (var i = 0; i < imageslen; i++) {
    images[i].style.left = IMAGE_WIDTH * i + "px";
    //adding indicator
    var ulElement = document.getElementById("carousel-indicator");
    var liElement = document.createElement("li");
    liElement.id = "circle" + i;
    var iconElement = document.createElement("i");
    if (i == 0) {
      iconElement.className = "fa fa-circle";
    } else {
      iconElement.className = "fa fa-circle-o";
    }
    liElement.addEventListener("click", function() {
      changeSlide(this);
    });
    liElement.appendChild(iconElement);
    ulElement.appendChild(liElement);
    console.log(liElement);
  }
  //   setInterval(function() {
  //     nextSlide(currentSlideIndex);
  //   }, 2000);

  document.getElementById("nextSlide").addEventListener("click", function() {
    nextSlide();
  });
  document.getElementById("prevSlide").addEventListener("click", function() {
    prevSlide();
  });

  function changeSlide(selected) {
    var nextSlideIndex = selected.getAttribute("id").split("circle")[1];
    console.log("indicator" + nextSlideIndex);
    changeIndicator(nextSlideIndex);
    if (nextSlideIndex < currentSlideIndex) {
      //left slidez
      slideleft(nextSlideIndex);
    } else {
      //right slide
      slideRight(nextSlideIndex);
    }
  }

  function changeIndicator(index) {
    console.log(index);
    document.getElementById(
      "circle" + currentSlideIndex
    ).childNodes[0].className = "fa fa-circle-o";
    //changing class name
    document.getElementById("circle" + index).childNodes[0].className =
      "fa fa-circle";
  }

  function nextSlide() {
    console.log("next slide");
    var nextSlideIndex = (currentSlideIndex + 1) % images.length;
    slideRight(nextSlideIndex);
  }

  function prevSlide() {
    var nextSlideIndex =
      (currentSlideIndex + images.length - 1) % images.length;
    slideleft(nextSlideIndex);
  }

  function slideRight(nextSlideIndex) {
    changeIndicator(nextSlideIndex);
    var currentWrapper = currentSlideIndex * IMAGE_WIDTH;
    var nextWrapper = nextSlideIndex * IMAGE_WIDTH;

    var intervalTime = setInterval(function() {
      if (nextSlideIndex == 0) {
        //backward slide
        currentWrapper -= 100;
      } else {
        currentWrapper += 100;
      }

      document.getElementsByClassName("carousel-image-wrapper")[0].style.left =
        -currentWrapper + "px";
      console.log("currentwrapper>>" + currentWrapper);
      console.log("next wrapper" + nextWrapper);

      if (nextSlideIndex == 0) {
        if (currentWrapper <= nextWrapper) {
          clearInterval(intervalTime);
        }
      } else {
        if (currentWrapper >= nextWrapper) {
          clearInterval(intervalTime);
        }
      }
    }, 30);

    currentSlideIndex = nextSlideIndex;
  }

  function slideleft(nextSlideIndex) {
    var currentWrapper = currentSlideIndex * IMAGE_WIDTH;
    var nextWrapper = nextSlideIndex * IMAGE_WIDTH;

    console.log("currentwrapper>>" + currentWrapper);
    changeIndicator(nextSlideIndex);

    var intervalTime = setInterval(function() {
      if (nextSlideIndex == images.length - 1) {
        currentWrapper += 100;
      } else {
        currentWrapper -= 100;
      }

      document.getElementsByClassName("carousel-image-wrapper")[0].style.left =
        -currentWrapper + "px";
      console.log("currentwrapper>>" + currentWrapper);
      console.log("next wrapper" + nextWrapper);

      if (nextSlideIndex == images.length - 1) {
        if (currentWrapper >= nextWrapper) {
          clearInterval(intervalTime);
        }
      } else {
        if (currentWrapper <= nextWrapper) {
          clearInterval(intervalTime);
        }
      }
    }, 30);
    currentSlideIndex = nextSlideIndex;
  }
};
