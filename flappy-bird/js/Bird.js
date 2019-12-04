class Bird {

  constructor(parent,ctx, x, y) {
    this.parentElement=parent;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 42;
    this.gravity= 1.0;
    this.velocity=0;
    this.lift=25;
    this.counter=0;
    this.hover=1;

  }
  init() {
    this.image = new Image();
    this.image.onload = () => {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    this.image.src = '../assets/bird.png';
     return this;
  }
  update() {
    this.velocity+=this.gravity;
   // this.x += 0.5;
    this.velocity*=0.9; //some air resistance
    this.y += this.velocity;
  }
  jumpUp(){
    this.velocity-=this.lift;
    
  }
  fallDown(){
    this.x=this.x;
    this.velocity+=this.gravity;
    this.velocity*=0.9;
    this.y+=this.velocity;
    
  }
  draw(){
      this.ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
  }

  float(){
  if((this.counter++)%10==0){
       this.hover=-this.hover;
    }
     this.y+=this.hover;
  }


}