class UI{
  constructor(x,y,width,height){
    this.x=x;
    this.y=y;
    this.width=width;
    this.height=height
  }
  init(score){
    this.uiCanvas=document.getElementById('ui-layer');
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
    imageSrc.forEach((element,index) => {
      const image=new Image();
      image.src=this.imageSrc[index];
      image.onload=()=>{
          imageCount++;
          if(imageCount==this.imageSrc.length){
             displayScoreElement();
          }
      }
      this.images.push(image);
    });
    //create score and restart button
   
    
  }
  displayScoreElement(){
    this.ctx.drawImage(this.images[0], dX, dY,, dHeight);
    
  }
}