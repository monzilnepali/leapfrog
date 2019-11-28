var points = [
    {x: 10, y: 20},
    {x: 40, y:40},
    {x: 60, y: 20},
    {x: 70, y:60},
    {x: 80, y: 80},
    {x: 90, y:20},
    {x: 100, y: 90},

];
function draw(ctx,x,y){
    
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle="blue";
    ctx.fill()
    ctx.stroke();
}


points.forEach(function(element){
    var canvas=document.getElementById('draw');
    var ctx = canvas.getContext('2d');
    draw(ctx,element.x,element.y)
})
