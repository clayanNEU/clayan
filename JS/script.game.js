// JAVASCRIPT DOC
var myGamePiece;
var myObstacle;

function startGame() {
  myGameArea.start();
  myGamePiece = new component(30, 30, "red", 10, 120);
  myObstacle = new component(10, 200, "green", 300, 120);
}

var myGameArea = {
  canvas : document.createElement("canvas"),
  start : function() {
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    // run this every 20th milisecond
    this.interval = setInterval(updateGameArea, 20);
  },
  clear : function() { // clears the canvas
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop : function() { // stops game
    clearInterval(this.interval);
  }
}

// Component creator
function component(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.speedX = 0; // speed indicators
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.update = function() { // handles drawing of the component
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  this.newPos = function() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
  this.crashWith = function(otherobj) {
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);
    var crash = true;
    if ((mybottom < othertop) ||
  (mytop > otherbottom) ||
(myright < otherleft) ||
(myleft > otherright)) {
  crash = false;
}
return crash;
  }
}

function updateGameArea() { // update for every frame
  if (myGamePiece.crashWith(myObstacle)) {
    myGameArea.stop();
  } else {
  myGameArea.clear();
  myObstacle.update();
  myGamePiece.newPos();
  myGamePiece.update();
}
}

function moveup() {
  myGamePiece.speedY -= 1;
}

function movedown() {
  myGamePiece.speedY += 1;
}

function moveleft() {
  myGamePiece.speedX -= 1;
}

function moveright() {
  myGamePiece.speedX += 1;
}

function stopMove() {
  myGamePiece.speedX = 0;
  myGamePiece.speedY = 0;
}
