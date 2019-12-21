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
    this.images=[];
    this.imageSrc=['../assets/bird-1.png','../assets/bird-2.png','../assets/bird-3.png'];

  }
  init() {
    let imageCount=0;
    this.imageSrc.forEach((element,index) => {
      let image=new Image();
      image.src=this.imageSrc[index];
      image.onload=()=>{}
      this.images.push(image);
    });
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
      this.ctx.drawImage(this.images[0],this.x,this.y,this.width,this.height);
  }

  float(){
  if((this.counter++)%10==0){
       this.hover=-this.hover;
    }
     this.y+=this.hover;
  }


}