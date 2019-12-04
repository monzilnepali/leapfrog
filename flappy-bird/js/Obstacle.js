class Obstacle {

  constructor(ctx, x, y,width,height,rotate) {
    this.parentElement=parent;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.rotate=rotate;
  }
  init() {
    console.log(this.ctx);
    this.image = new Image();
    this.image.onload = () => {
      this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    if(this.rotate==0){
        this.image.src = './assets/pipe.png';
    }else{
      this.image.src = './assets/pipe-rotate.png';
    }
    return this;
    
  }
  update() {
    this.x += -2;
  }
  draw(){
       this.ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
   
  }

  checkCollision(bird){
  if(this.y+this.height<bird.y || this.y>bird.y+bird.height ||
  this.x+this.width<bird.x || this.x > bird.x+bird.height){
    return false;
  }
  return true;
  }
 


}