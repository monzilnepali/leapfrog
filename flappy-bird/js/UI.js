class UI{
  constructor(parent,x,y,width,height,restartEventKey){
    this.parent=parent;
    this.x=x;
    this.y=y;
    this.width=width;
    this.height=height;
    this.restartEvent=restartEventKey;
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
  showTip(){
 if(this.restartEvent==1){
     this.ctx.fillText("press  W to start",100,600)
    }else{
      this.ctx.fillText("press  arrow-up to start",100,600 )
    }
  }
   clear() {
    this.ctx.clearRect(0, 0, this.uiCanvas.width, this.uiCanvas.height);
  }
  displayScore(Score){
    this.score=Score;
    this.clear();
    let imageCount=0;
    this.imageSrc=['https://monzilnepali.github.io/leapfrog/flappy-bird/assets/restart.png','https://monzilnepali.github.io/leapfrog/flappy-bird/assets/score.png'];
    this.images=[];
    //load image
    this.imageSrc.forEach((element,index) => {
      let image=new Image();
      image.src=this.imageSrc[index];
      image.onload=()=>{
          imageCount++;
          if(imageCount==this.imageSrc.length){
             this.displayScoreElement();
          }
      }
      this.images.push(image);
    });
    
   
    
  }
  displayScoreElement(){
   
    let highScore=localStorage.getItem('score');
    
   // this.ctx.drawImage(this.images[0], 190, 480,120,40);
    this.ctx.drawImage(this.images[1], 150, 200,190,250);
     this.ctx.fillText(this.score, 230, 300);
     this.ctx.fillText(highScore, 230, 390);
      this.ctx.fillText('press '+this.restartEvent +' to restart', 120, 500);
     


  }
}