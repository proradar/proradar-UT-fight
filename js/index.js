var dead = false
var myGamePiece;
var myObstacles = [];
var myObstacles2 = [];
var myObstacles3 = [];
var myObstacles4 = [];
var myObstacles5 = [];
var health = 92;
var poison = 0;
var myScore;
var myHighScore;
var highScore = 0;
var score = 0;
var myHealth;
var myHealth;
var myHealthNum;
var hasPressed = false;
var audio = new Audio('megalovania.mp3');

audio.addEventListener('ended', function() {
    if (dead == false) {
      this.currentTime = 0;
      this.play();
    }
}, false);

function startGame() {
    myGamePiece = new component(30, 30, "red", 10, 120);
    myGamePiece.gravity = 0.05;
    myScore = new component("30px", "Consolas", "white", 280, 40, "text");
    myHighScore = new component("30px", "Consolas", "white", 200, 80, "text");
    myHighScore.color = "#fff";
    myHealth = new component("30px", "Consolas", "red", 280, 120, "text");
    myHealthNum = new component("30px", "Consolas", "red", 375, 120, "text");
    myScore.color = "#fff";
    myHealth.color = "#f00";
    myHealthNum.color = "#f00";
    if (hasPressed == false) {
      setInterval(poisonUpdate, 1000)
    }
    myGameArea.start();
    audio.play();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 500;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        document.getElementById('gameContent').appendChild(this.canvas);
        this.frameNo = 0;
        if (hasPressed == false) {
          this.interval = setInterval(updateGameArea, 20);
          hasPressed = true;
        }
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = this.color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.hitBottom();
    }
    this.hitBottom = function() {
        var bottom = myGameArea.canvas.height - this.height;
        var top = 0;
        var right = myGameArea.canvas.width - this.width;
        var left = 0;
        if (this.y > bottom) {
            this.y = bottom;
        }
        if (this.y < top) {
            this.y = top;
        }
        if (this.x < left) {
            this.x = left;
        }
        if (this.x > right) {
            this.x = right;
        }
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
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
  if (dead == false) {

    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            hurt(1)
        }
    }
    for (i = 0; i < myObstacles2.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles2[i])) {
          if (myGamePiece.speedY != 0) {
            hurt(1)
          }
          else if (myGamePiece.speedX != 0) {
            hurt(1)
          }
        }
    }
    for (i = 0; i < myObstacles3.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles3[i])) {
          if (myGamePiece.speedY == 0 && myGamePiece.speedX == 0) {
            hurt(1)
          }
        }
    }
    for (i = 0; i < myObstacles4.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles4[i])) {
            heal(20)
            myObstacles4.splice(i, 1);
        }
    }
    for (i = 0; i < myObstacles5.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles5[i])) {
          if (myGamePiece.speedY == 0 && myGamePiece.speedX == 0) {
            hurt(1)
          }
        }
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(100)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        select = Math.floor(Math.random()*4+1);
        if (myGameArea.frameNo >= 1500) {
          select = Math.floor(Math.random()*13+1);
        }
        else if (myGameArea.frameNo >= 1000) {
          select = Math.floor(Math.random()*12+1);
        }
        else if (myGameArea.frameNo >= 500) {
          select = Math.floor(Math.random()*8+1);
        }
        if (select == 1 || select == 2 || select == 3 || select == 4) {
          myObstacles.push(new component(10, height, "white", x, 0));
          myObstacles.push(new component(10, x - height - gap, "white", x, height + gap));
        }
        else if (select == 5 || select == 6 || select == 7 || select == 8) {
          myObstacles2.push(new component(10, 500, "#0ff", x, 0));
        }
        else if (select == 9 || select == 10 || select == 11 || select == 12) {
          myObstacles3.push(new component(10, 500, "#ff0", x, 0));
        }
        else if (select == 13) {
          myObstacles4.push(new component(10, 50, "#cfc", x, Math.floor(Math.random()*450+50)));
        }
    }
    if (myGameArea.frameNo == 1 || everyinterval(120)) {
      if (myGameArea.frameNo >= 2000) {
        x = myGameArea.canvas.width;
        myObstacles5.push(new component(50, 10, "#fff", x, Math.floor(Math.random()*450+50)));
      }
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -5;
        myObstacles[i].update();
    }
    for (i = 0; i < myObstacles2.length; i += 1) {
        myObstacles2[i].x += -5;
        myObstacles2[i].update();
    }
    for (i = 0; i < myObstacles3.length; i += 1) {
        myObstacles3[i].x += -5;
        myObstacles3[i].update();
    }
    for (i = 0; i < myObstacles4.length; i += 1) {
        myObstacles4[i].x += -5;
        myObstacles4[i].update();
    }
    for (i = 0; i < myObstacles5.length; i += 1) {
        myObstacles5[i].x += -8;
        myObstacles5[i].update();
    }
    myScore.text="SCORE: " + score;
    myScore.update();
    myHighScore.text="HIGH SCORE: " + highScore;
    myHighScore.update();
    myHealth.text="Health:";
    myHealth.update();
    myHealthNum.text=health;
    myHealthNum.update();
    if (leftKey == true) {
      myGamePiece.speedX = -5;
    }
    if (rightKey == true) {
      myGamePiece.speedX = 5;
    }
    if (rightKey == false) {
      if (leftKey == false) {
        myGamePiece.speedX = 0;
      }
    }
    if (upKey == true) {
      myGamePiece.speedY = -5;
    }
    if (downKey == true) {
      myGamePiece.speedY = 5;
    }
    if (downKey == false) {
      if (upKey == false) {
        myGamePiece.speedY = 0;
      }
    }
    myGamePiece.newPos();
    myGamePiece.update();
    console.log(poison);
    score = score + 1;
    if (highScore < score) {
      highScore = highScore + 1;
    }
  }
}

document.onkeydown = checkKey;
document.onkeyup = stopKey;
var rightKey = false;
var leftKey = false;
var upKey = false;
var downKey = false;

function checkKey(e) {
    key = e || window.event;
    // console.log(key);
    if (key.keyCode == '38') {
        // up arrow
        // console.log("Up");
        upKey = true;
    }
    else if (key.keyCode == '40') {
        // down arrow
        // console.log("Down");
       downKey = true;
    }
    else if (key.keyCode == '37') {
       // left arrow
       // console.log("Left");
       leftKey = true;
    }
    else if (key.keyCode == '39') {
       // right arrow
       // console.log("Right");
       rightKey = true;
    }

}

function stopKey(e) {
    key = e || window.event;
    // console.log(key);
    if (key.keyCode == '38') {
        // up arrow
        // console.log("Up");
        upKey = false;
    }
    else if (key.keyCode == '40') {
        // down arrow
        // console.log("Down");
       downKey = false;
    }
    else if (key.keyCode == '37') {
       // left arrow
       // console.log("Left");
       leftKey = false;
    }
    else if (key.keyCode == '39') {
       // right arrow
       // console.log("Right");
       rightKey = false;
    }

}

function hurt(n) {
  if (poison < 40) {
    poison = poison + 1;
  }
  health = health - n;
  if (health <= 0) {
    dead = true
    audio.pause();
    audio.currentTime = 0;
  }
}
function heal(n) {
  if (health < 92) {
    if ((health+20) > 92) {
      health = 92
    }
    else {
      health = health + (n);
    }
  }
}

function poisonUpdate() {
  if (poison > 0 ) {
    myHealthNum.color = "#f0f";
    // console.log("POISON");
    if (health > 1) {
      health = health - 1
      poison = poison - 1
    }
    else {
      poison = 0
    }
  }
  else {
    myHealthNum.color = "#f00";
  }
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

sansDances = document.getElementById('sansDances');

sansDances.style.opacity = 0;
start.onclick = function() {
  dead = false
  myGamePiece;
  myObstacles = [];
  myObstacles2 = [];
  myObstacles3 = [];
  myObstacles4 = [];
  myObstacles5 = [];
  health = 92;
  poison = 0;
  myScore;
  myHealth;
  myHealth;
  myHealthNum;
  audio.currentTime = 0;
  sansDances.style.opacity = 0.2;
  score = 0;
  startGame()
}
