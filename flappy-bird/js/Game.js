'use-strict'
class Game {

  constructor(parent, width, height,key) {
    this.parent=parent;
    this.width = width;
    this.height = height;
    this.obstacles = [];
    this.FPS = 60;
    this.frameNo=0;
    this.gameStatus=false;
    this.collisionStatus=false;
    this.score=0;
    this.highScore=0;
    this.key=key;



  }
  init() {
    this.canvas=this.parent.children[1];
   // console.log(this.canvas)
    //getting hight value from local storage
    if(localStorage.getItem('score')!=null){
    this.highScore=localStorage.getItem('score');
    }else{
      localStorage.setItem('score',this.highScore);
    }
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext('2d');
    this.createBackground();
    this.uiLayer=new UI(this.parent,this.width/2-30, this.height/2-250,this.width,this.height).init(this.score);
    this.bird = new Bird(this.parent,this.ctx, this.width/2-40, this.height/2-30).init();
    this.gameLoop = setInterval(() => this.start(), 20);

    window.addEventListener('keydown', (e) =>this.keyDownEventHandle(e));

  }

  keyDownEventHandle(event){
    console.log("ley press")
     if(event.code==this.key){
       //move up
        if(!this.collisionStatus){
       console.log("keydown");
       this.gameStatus=true;
       this.bird.jumpUp();
     }
   }
  }
   
  
  
  
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  createBackground() {
    const bgCanvas =this.parent.children[0];
    bgCanvas.width = 480;
    bgCanvas.height = 640;
    const bgCanvasCtx = bgCanvas.getContext('2d');
    const backgroundImage = new Image();
    backgroundImage.onload = () => {
      bgCanvasCtx.drawImage(backgroundImage, 0, 0, this.width, this.height);
    }
    backgroundImage.src = '../assets/background.png';
  }

  



 
 updateHighScore(){
   if(this.score>this.highScore){
     localStorage.setItem("score",this.score);
   }
 }
  everyInterval(n) {
        if ((this.frameNo / n) % 1 == 0) {
            return true;
        }
        return false;
    }



  start() {
     this.clear();
     //ui layer
    // this.uiLayer.updateScore(0);
    // console.log("score"+Math.floor(this.frameNo / 250));
     this.score=Math.floor(this.frameNo/250);
     this.uiLayer.updateScore(this.score);

     if(!this.gameStatus){
           this.bird.float();
           this.bird.draw();


     }else{
     if(this.bird.y>590){
        //game over
       this.bird.y=590;
       this.velocity=0;
       this.updateHighScore();
       this.uiLayer.displayScore(this.score);
       clearInterval(this.gameLoop);
     }
     
    this.obstacles.forEach((element) => {
        element.update();
        element.draw();
        //if obstacle is beyond x:0  then remove from list

             

        if(element.checkCollision(this.bird)){
          console.log("collision");
          this.collisionStatus=true;
          
        }
        
     });
     if(this.collisionStatus){
         console.log("falldown");
         //remove event listener
          this.bird.fallDown();
           this.bird.draw();
           this.updateHighScore();
           this.uiLayer.displayScore(this.score);
            clearInterval(this.gameLoop);
         

     }else{
     this.bird.update();
     this.bird.draw();
  
    this.frameNo += 1;
    if (this.frameNo == 1 || this.everyInterval(250)) {
        let x = this.height;
        let y = this.width;
        let minHeight = 100;
        let  maxHeight = 300;
        let height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
        let minGap = 130;
        let maxGap = 180;
       let gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        console.log("obstacle created");
        console.log(this.ctx);
        this.obstacles.push(new Obstacle(this.ctx,y,0,70,height,1).init());
        this.obstacles.push(new Obstacle(this.ctx,y,height + gap,70,x-height-gap,0).init());

    }

     }
     }
  }


}
const parentELement1=document.getElementById('canvas-stage1'); 
new Game(parentELement1,480, 640,'KeyW').init();

const parentELement2=document.getElementById('canvas-stage2'); 
new Game(parentELement2,480, 640,'ArrowUp').init();
