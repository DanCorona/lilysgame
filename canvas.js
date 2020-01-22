
//fillRect(x,y,width,height)
// c.fillStyle = 'rgba(0,0,0,.5)'
// c.fillRect(200,200,50,50);
// c.fillStyle = 'rgba(100,0,0,.5)'
// c.fillRect(250,200,50,50);
// c.fillStyle = 'rgba(0,200,0,.5)'
// c.fillRect(200,250,50,50);
//

// //lineHeight
// c.beginPath();
// //moveto(x,y)
// c.moveTo(50,300);
//
// c.lineTo(300,100);
// c.strokeStyle = 'rgba(200,0,0.7)';
// c.moveTo(100,100);
// c.lineTo(250,300);
// c.strokeStyle = 'rgba(76,44,0,1)';
//
//
// c.stroke();

//arc
// c.beginPath();
// c.arc(100, 75, 50, 0, 2 * Math.PI);
// c.strokeStyle = 'rgba(255,44,0,1)';
// c.stroke();

//for loop
// canvas.addEventListener("click", randCircles);

// function randCircles(){
//     for(var i =0; i<3; i++){
//     var x= Math.random() * window.innerWidth;
//     var y= Math.random() * window.innerHeight;
//     var r= Math.random() * 255;
//     var g= Math.random() * 255;
//     var b= Math.random() * 255;
//     c.beginPath();
//     c.arc(x, y, 50, 0, 2 * Math.PI);
//     c.strokeStyle = 'rgba('+r+','+g+','+b+',1)';
//     c.stroke();
//     }
// }
// console.log(canvas);
//////////////////////new start

///setting canvas to window height .
var score =0;
var canvas = document.querySelector('canvas');

console.log("starts");
window.addEventListener('mousemove',function(event){

})
cW = 400;
cH = 400;
canvas.width = canvas.scrollWidth;
canvas.height = canvas.scrollHeight ;
var c = canvas.getContext('2d'); //sets canvs to 2d
function Circle(id,x,y,dx,dy,radius,clr) {
 this.x = x;
 this.y = y;
 this.dx = dx;
 this.dy = dy;
 this.radius = radius;
 this.id= id;
 this.clr=clr;

console.log("xy",x,y);
//draw





};
Circle.prototype.draw = function(){

  c.beginPath();
  c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI,false);
  //c.addHitRegion({ida: 'circle'});
  c.strokeStyle = 'blue';
    c.fillStyle = this.clr;
  c.fill();
  c.stroke();
  c.font = "12px Arial";
c.strokeText(`${this.id}`, this.x, this.y);
  // console.log("circle drawn");


};
Circle.prototype.update = function(){
  if (this.x + this.radius > cW ||this.x - this.radius < 0) {
      this.dx= -this.dx;
  }
   if (this.y + this.radius > 400 ||this.y - this.radius < 0) {
        this.dy= -this.dy;
      }

  this.x += this.dx;
  this.y += this.dy;

  this.draw();

};

//touch detection
Circle.prototype.isHitBy= function(x,y,r){
  //a**+b**=c**
  /*
square root of (mousex -positionX squared) +( mouseY - positionY squared )
  */
let distance =Math.sqrt(Math.pow(x- this.x,2)+Math.pow(y - this.y,2));
return distance <= this.radius;
};

var circleArray = [] ;

function babies ()
{
  for (var i = 0; i < 5; i++) {
    let radius = 25;
    let x= Math.random() *(canvas.width - radius*2)+ radius;
    let y = Math.random() *(canvas.height - radius*2)+ radius;
    let dx = Math.random() * -0.5 *5;
    let dy = Math.random() * -0.5 *5;
    let clr = 'red';
  //var numText = '' ;
  var circle =new Circle(i,x,y,dx,dy,radius,clr);
  //  var circle = new Circle(200,200,3,4,40);
    circleArray.push( circle);

  }
}
babies();
///event mouse down deletes the circle
canvas.addEventListener('touchend', function(e) {
  let mX=( e.clientX- c.canvas.offsetLeft)  ;
  let mY= (e.clientY- c.canvas.offsetTop)  ;

  let canvasBounds = canvas.getBoundingClientRect();
  let clickX = e.pageX - canvasBounds.left;
  let clickY = e.pageY - canvasBounds.top;
  for (var i = 0; i < circleArray.length; i++) {
  if(circleArray[i].isHitBy(clickX,clickY)){
    console.log("resasre",i);
    let  target=circleArray[i];
    target.clr='green';

    target.radius += 10;
    let n=i;
    console.log (`${n}  ${i}`)
  setTimeout(function(){

circleArray.splice(n,1)
}, 100);
if(score<500){
 score += 25;
 document.getElementById('status').innerHTML = `Score: ${score}`
    //target.radius=0;
  }else {
    score = 5;
    document.getElementById('status').innerHTML = `Score: ${score}`
  } ///target.pop();
  setTimeout(function(){

newBubbles();
}, 500);

  }
}


});

function newBubbles(){
  if (circleArray === undefined || circleArray.length == 0) {
    babies();
    console.log('BABIES!!!!!1');
}
console.log('No babies :(');
}
//animates the circle

function animate () {

    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth, innerHeight);
    for (var i = 0; i < circleArray.length; i++) {
      circleArray[i].update();
      //console.log(circleArray[1].x)
    }


}


animate();

console.log(circleArray)
