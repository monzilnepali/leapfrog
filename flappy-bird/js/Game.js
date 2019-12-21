'use-strict'

class Game {

  constructor(parent, width, height,gamekey,restartKey,restartGameRef) {
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
    this.key=gamekey;
    this.restartKey=restartKey;
    this.restartGameRef=restartGameRef;
    
    
   
  }
  init() {
    
    //different key event for multiple instance
    if(this.key=='KeyW'){
       this.restartEventKey=1;
    }else if(this.key=='ArrowUp'){
      this.restartEventKey=2;
    }
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
    this.uiLayer=new UI(this.parent,this.width/2-30, this.height/2-250,this.width,this.height,this.restartEventKey).init(this.score);
    this.bird = new Bird(this.parent,this.ctx, this.width/2-40, this.height/2-30).init();
    this.gameLoop = setInterval(() => this.start(), 20);

    window.addEventListener('keydown', (e) =>this.keyDownEventHandle(e));
    window.addEventListener('keypress',(event)=>{
    
      if(this.collisionStatus){
        console.log("restart",this.restartKey)
     if(event.code==this.restartKey){

       console.log("restart");
       this.clear();
       this.uiLayer.clear();
       this.bgCanvasCtx.clearRect(0, 0, this.width, this.height);
       this.backgroundImage=null;
      this.canvas=null;
       this.uiLayer=null;
       this.bird=null;
       this.gameLoop =null;
       this.bgCanvas=null;   
      //  game1=null;
       this.restartGameRef(); 
     }
    }
    });

  }

  keyDownEventHandle(event){
   
    if(!this.collisionStatus){
     if(event.code==this.key){
       //move up
       this.gameStatus=true;
       this.bird.jumpUp();
     }
    }
  }

 

   

  
   
  
  
  
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
  createBackground() {
    this.bgCanvas =this.parent.children[0];
    this.bgCanvas.width = this.width;
    this.bgCanvas.height = this.height;
    this.bgCanvasCtx = this.bgCanvas.getContext('2d');
    this.backgroundImage = new Image();
    this.backgroundImage.onload = () => {
      this.bgCanvasCtx.drawImage(this.backgroundImage, 0, 0, this.width, this.height);
    }
    this.backgroundImage.src ='https://monzilnepali.github.io/leapfrog/flappy-bird/assets/background.png';
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
     this.score=Math.floor(this.frameNo/150);
     this.uiLayer.updateScore(this.score);

     if(!this.gameStatus){
           this.bird.float();
           this.bird.draw();
           this.uiLayer.showTip();


     }else{

     if(this.bird.y>590){
        //game over
       this.bird.y=590;
       this.velocity=0;
       this.updateHighScore();
        this.collisionStatus=true;
       this.uiLayer.displayScore(this.score);
        this.gameStatus=false;
       clearInterval(this.gameLoop);
     }
     
    this.obstacles.forEach((element) => {
        element.update();
        element.draw();
        //if obstacle is beyond x:0  then remove from list

        if(element.checkCollision(this.bird)){
          //console.log("collision");
          this.collisionStatus=true;
          
        }
        
     });
     if(this.collisionStatus){
        // console.log("falldown");
         //remove event listener
          this.bird.fallDown();
           this.bird.draw();
           this.updateHighScore();
           this.uiLayer.displayScore(this.score);
            this.gameStatus=false;
            clearInterval(this.gameLoop);
         

     }else{
     this.bird.update();
     this.bird.draw();
  
    this.frameNo += 1;
    if (this.frameNo == 1 || this.everyInterval(122)) {
        let x = this.height;
        let y = this.width;
        let minHeight = 100;
        let  maxHeight = 300;
        let height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
        let minGap = 130;
        let maxGap = 180;
       let gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
    //    console.log("obstacle created");
      
        this.obstacles.push(new Obstacle(this.ctx,y,0,70,height,1).init());
        this.obstacles.push(new Obstacle(this.ctx,y,height + gap,70,x-height-gap,0).init());

    }

     }
     }
  }


}

var game1,game2;
function startGame1(){
  console.log("starting new game")
let parentELement1=document.getElementById('canvas-stage1'); 
 game1=new Game(parentELement1,480, 640,'KeyW','Digit1',startGame1);
 game1.init();
}

function startGame2(){
let parentELement2=document.getElementById('canvas-stage2'); 
 game2=new Game(parentELement2,480, 640,'ArrowUp','Digit2',startGame2);
 game2.init();
}

startGame1();
startGame2();