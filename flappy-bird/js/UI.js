class UI{
  constructor(parent,x,y,width,height){
    this.parent=parent;
    this.x=x;
    this.y=y;
    this.width=width;
    this.height=height
  }
  init(score){
    this.uiCanvas=this.parent.children[2];
    this.uiCanvas.width=this.width;
    this.uiCanvas.height=this.height;
    this.ctx=this.uiCanvas.getContext('2d');
    this.ctx.font = "30px Arial";
    this.ctx.fillText(score, this.x,this.y);
    return this;
  }
  updateScore(score){
     this.clear();

     this.ctx.fillText(score, this.x, this.y);
  }
   clear() {
    this.ctx.clearRect(0, 0, this.uiCanvas.width, this.uiCanvas.height);
  }
  displayScore(Score){
    this.clear();
    let imageCount=0;
    this.imageSrc=['../assets/restart.png','../assets/score.png'];
    this.images=[];
    //load image
    this.imageSrc.forEach((element,index) => {
      const image=new Image();
      image.src=this.imageSrc[index];
      image.onload=()=>{
          imageCount++;
          if(imageCount==this.imageSrc.length){
             this.displayScoreElement(Score);
          }
      }
      this.images.push(image);
    });
    
   
    
  }
  displayScoreElement(Score){
    console.log(this.images);
    let highScore=localStorage.getItem('score');
    
    this.ctx.drawImage(this.images[0], 190, 480,120,40);
    this.ctx.drawImage(this.images[1], 150, 200,190,250);
     this.ctx.fillText(Score, 230, 300);
     this.ctx.fillText(highScore, 230, 390);


  }
}