class App {
  constructor() {
    new Editor(this.context);
  }

}

window.onload = function () {
  var container = document.getElementById('container');
  container.style.height = window.innerHeight + "px";
  new App();
  let example1Data = "user->atm:card insert" +
    "\natm->user:enter your pin code" +
    "\nuser->atm:pin code send" +
    "\natm->bank:check this details";
  let example1 = document.getElementById("example1");
  example1.addEventListener('click', () => {
    console.log("example 1  ");
    console.log(example1Data)
    let element = document.getElementsByClassName('text-area')[0];
    element.value = example1Data;
    let event = new Event('input');
    element.dispatchEvent(event);

  });

}