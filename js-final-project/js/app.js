class App {
  constructor() {
    new Editor(this.context);
  }

}

window.onload = function () {
  var container = document.getElementById('container');
  container.style.height = window.innerHeight + "px";
  new App();
}
document.getElementById('new').addEventListener('click', () => {
  console.log("new tab")
  new App()
});