var context;
var x=25;
var y=475;
var dy=1;
var dx=0.05;
var color=['green','red','purple','black','gray']
var ballcolor="red";
function start(){
    var canvas=document.getElementById('draw')
    console.log("start")
    context=canvas.getContext('2d')
     setInterval(draw,5);
   
}
function draw(){
    console.log("draw")
    context.clearRect(0,0, 500,500);
    context.beginPath();
    context.fillStyle=ballcolor;
    context.arc(x, y, 25, 0, 2 * Math.PI);
        if( y<25 || y>475){
            dy=-dy; 
            var index=Math.floor(Math.random() * 5);
            console.log("color",color[index])
             ballcolor=color[index]
        }
        
            y+=dy;
            x+=dx;
            context.fill()
            context.stroke();  
    }

start()