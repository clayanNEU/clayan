// JAVASCRIPT DOC
var myGamePiece;
var myObstacles = [];
var myScore;
var myBackground;
var crashSound;
var myRewards = [];

function startGame() {
  myGamePiece = new component(35, 60, "images/game/milo-sponge.png", 10, 120, "image");
  myScore = new component("30px", "Consolas", "white", 280, 40, "text");
  myBackground = new component(680, 400, "images/MILO-BANANA.png", 0, 0, "background");
  crashSound = new sound("sounds/splat.mp3");
  myGameArea.start();
}

var myGameArea = {
  canvas : document.createElement("canvas"),
  start : function() {
    this.canvas.width = 680;
    this.canvas.height = 400;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    // document.getElementById("intro").insertAdjacentHTML("afterend", this.canvas);
    // counts frames
    this.frameNo = 0;
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
function component(width, height, color, x, y, type) {
  this.type = type;
  if (type == "image" || type == "background") {
    this.image = new Image();
    this.image.src = color;
  }
  this.width = width;
  this.height = height;
  this.speedX = 0; // speed indicators
  this.speedY = 0;
  this.gravity = 0.03;
  this.gravitySpeed = 0;
  this.bounce = 0.6;
  this.x = x;
  this.y = y;
  this.update = function() { // handles drawing of the component
    ctx = myGameArea.context;
    if (this.type == "text") {
      ctx.font = this.width + " " + this.height;
      ctx.fillStyle = color;
      ctx.fillText(this.text, this.x, this.y);
    } else if (this.type == "image" || type == "background") {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      // draws the next background
      if (type == "background") {
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
      }
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  this.newPos = function() {

    // loops the background and doesn's fall to gravity
    if (this.type == "background") {
      if (this.x == -(this.width)) {
        this.x = 0;
      }
    } else {
      this.x += this.speedX;
      this.y += this.speedY + this.gravitySpeed;
      this.gravitySpeed += this.gravity;
      this.hitBottom();

    }
  }
  // ensures nothing drops out of the game
  this.hitBottom = function () {
    var rockbottom = myGameArea.canvas.height - this.height;
    if (this.y > rockbottom) {
      this.y = rockbottom;
      this.gravitySpeed = -(this.gravitySpeed * this.bounce);
    }
  }


  this.crashWith = function(otherobj) {
    // checks if component crashes w another component
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
  var x, y;

  for (i = 0; i < myObstacles.length; i++) {
    // loop through every obstacle to check for crash
        if (myGamePiece.crashWith(myObstacles[i])) {
          crashSound.play();
          myGameArea.stop();
          return;
        }
      }

      for (i = 0; i < myRewards.length; i++) {
        // loop through every reward to see if character caught it
            if (myGamePiece.crashWith(myRewards[i])) {
              crashSound.play();
              myGameArea.frameNo += 10;
            }
          }

      myGameArea.clear();
      // updates so background is in the back
      myBackground.speedX = -1;
      myBackground.newPos();
      myBackground.update();
      myGameArea.frameNo += 1;

      // obstacle of random sizes
      if (myGameArea.frameNo == 1 || everyInterval(150)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 80;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(10, height, "green", x, 0));
        myObstacles.push(new component(10, x - height - gap, "green", x, height + gap));
      }

      for (i = 0; i < myObstacles.length; i++) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
      }

      // rewards at random places
      if (myGameArea.frameNo == 1 || everyInterval(150)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 80;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myRewards.push(new component(35, 40, "images/game/bananas.png", x, height + gap, "image"));
      }

      for (i = 0; i < myRewards.length; i++) {
        myRewards[i].x += -1;
        myRewards[i].update();
      }

      myScore.text = "SCORE: " + myGameArea.frameNo;

      myGamePiece.newPos();
      myGamePiece.update();
      myScore.update();

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

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function() {
    this.sound.play();
  }
  this.stop = function () {
    this.sound.pause();
  }
}

function accelerate(n) {
  myGamePiece.gravity = n;
}

// returns true if the current framenumber corresponds w the given interval
function everyInterval(n) {
  if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
  return false;
}
