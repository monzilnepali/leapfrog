window.onload = function () {

    var images = document.getElementsByTagName('img');
    var imageslen = images.length;
    console.log(images);

    currentSlideIndex = 0;
    // document.getElementById("slide" + currentSlideIndex).style.left = 0;
    for (var i = 0; i < imageslen; i++) {
        // images[i].style.left = (IMAGE_WIDTH * i) + "px"
        //adding indicator
        var ulElement = document.getElementById('carousel-indicator');
        var liElement = document.createElement("li");
        liElement.id = "circle" + i;
        var iconElement = document.createElement("i");
        if (i == 0) {
            iconElement.className = "fa fa-circle";
        } else {
            iconElement.className = "fa fa-circle-o";
        }
        liElement.addEventListener("click", function () {
            changeSlide(this)
        })
        liElement.appendChild(iconElement);
        ulElement.appendChild(liElement)
        console.log(liElement)


    }
    setInterval(function () {
        nextSlide(currentSlideIndex)
    }, 2000);





    document.getElementById('nextSlide').addEventListener("click", function () {

        nextSlide();
    });
    document.getElementById('prevSlide').addEventListener("click", function () {

        prevSlide();
    });


    function changeSlide(selected) {
        var nextSlideIndex = selected.getAttribute("id").split("circle")[1]
        console.log("indicator" + nextSlideIndex)
        changeIndicator(nextSlideIndex)
        if (nextSlideIndex < currentSlideIndex) {
            //left slidez
            slideleft(nextSlideIndex)
        } else {
            //right slide
            slideRight(nextSlideIndex)
        }



    }

    function changeIndicator(index) {
        console.log(index)
        document.getElementById("circle" + currentSlideIndex).childNodes[0].className = "fa fa-circle-o"
        //changing class name
        document.getElementById("circle" + index).childNodes[0].className = "fa fa-circle"
    }



    function nextSlide() {
        console.log("next slide")
        var nextSlideIndex = (currentSlideIndex + 1) % images.length;
        slideRight(nextSlideIndex);
    }


    function prevSlide() {
        var nextSlideIndex = (currentSlideIndex + images.length - 1) % images.length;
        slideleft(nextSlideIndex);
    }

    function slideRight(nextSlideIndex) {
        changeIndicator(nextSlideIndex)
        document.getElementById("slide" + nextSlideIndex).style.left = "100%";
        document.getElementById("slide" + currentSlideIndex).style.left = 0;
        document.getElementById("slide" + nextSlideIndex).setAttribute("class", "slideInRight");
        document.getElementById("slide" + currentSlideIndex).setAttribute("class", "slideOutLeft");
        currentSlideIndex = nextSlideIndex;
    }

    function slideleft(nextSlideIndex) {
        changeIndicator(nextSlideIndex);
        document.getElementById("slide" + currentSlideIndex).style.left = 0;
        document.getElementById("slide" + nextSlideIndex).style.left = "-100%";
        document.getElementById("slide" + nextSlideIndex).setAttribute("class", "slideInLeft");
        document.getElementById("slide" + currentSlideIndex).setAttribute("class", "slideOutRight");
        currentSlideIndex = nextSlideIndex;
    }

}