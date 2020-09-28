// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const p = document.querySelector('p');
const msg = document.querySelector('.message');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  if (num === 0) {
      return random(min, max);
  } else return num;
}

function Shape(x,y,velX,velY,exists) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.exists = exists;
}

function EvilCircle(x,y,velX,velY,exists,color,size) {
    Shape.call(this,x,y, velX, velY,exists);
    this.color = color;
    this.size = size;
}

EvilCircle.prototype = Object.create(Shape.prototype);
EvilCircle.prototype.constructor = EvilCircle;

EvilCircle.prototype.draw = function() {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
}

EvilCircle.prototype.checkBounds = function() {
    if ((this.x + this.size) >= width) {
        this.x = this.x - this.size - 5; 
    }

    if ((this.x - this.size) <= 0) {
        this.x = this.x + this.size + 5;
    }

    if ((this.y + this.size) >= height) {
        this.y = this.y - this.size - 5;
    }

    if((this.y - this.size) <= 0) {
        this.y = this.y + this.size + 5;
    }
}

EvilCircle.prototype.setControls = function() {
    var _this = this;
    window.onkeydown = function(e) {
        if (e.keyCode === 65) {
            _this.x -= _this.velX;
        } else if (e.keyCode === 68) {
            _this.x += _this.velX;
        } else if (e.keyCode === 87) {
            _this.y -= _this.velY;
        } else if (e.keyCode === 83) {
            _this.y += _this.velY;
        }
    }
}

EvilCircle.prototype.collisionDetect = function() {
    for (let j = 0; j < balls.length; j++) {
        if (balls[j].exists === true) { //(!(this === balls[j])) {
          let dx = this.x - balls[j].x;
          let dy = this.y - balls[j].y;
          let distance = Math.sqrt(dx * dx + dy * dy);
    
          if (distance < this.size + balls[j].size) {
              balls[j].exists = false;
            //balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
          }
        }
    }
}

//function evilCreate() {}

function Ball(x, y, velX, velY,exists,color,size) {
    Shape.call(this,x,y,velX,velY,exists);
    this.color = color;
    this.size = size;
}

Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
}

Ball.prototype.update = function() {
    if ((this.x + this.size) >= width) {
        this.velX = -(this.velX); 
    }

    if ((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
    }

    if ((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }

    if((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }

    this.x +=this.velX;
    this.y +=this.velY;

}
/*
Ball.prototype.collisionDetect = function() {
    for (let j = 0; j < balls.length; j++) {
      if (!(this === balls[j])) {
        let dx = this.x - balls[j].x;
        let dy = this.y - balls[j].y;
        let distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < this.size + balls[j].size) {
          balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
        }
      }
    }
}
*/

function count() {
    let cnt = balls.length;
    for (let i=0; i<balls.length; i++) {
        if (balls[i].exists === false) {
            cnt--;
        }
        p.textContent = 'У Артёма осталось ' + cnt + ' шаров.';
    }
    if (cnt === 0) {
        msg.textContent = 'ВЫ ВЫИГРАЛИ!'
    }
}

let balls = [];

/*let evilCreate = new EvilCircle(random(0,width), random(0,height), 20, 20,
    ///,
    'white',
    10
);*/

let evilBalls = [];

function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0,0, width, height);

    while (evilBalls < 1) {
        let evilCreate = new EvilCircle(random(20,width-20),random(20,height-20),20,20,true,'white',10);
        evilBalls.push(evilCreate);
    }

    while (balls.length < 500) {
        let ball = new Ball(
            random(20,width - 20),
            random(20,height -20),
            random(-7,7),
            random(-7,7),
            true,
            'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) + ')',
            random(10,20)
        );
        balls.push(ball);
    }

    for (let i=0; i < balls.length; i++) {
        if (balls[i].exists === true) {
            balls[i].draw();
            balls[i].update();
            //balls[i].collisionDetect();
        }
    }

    for (let i=0; i < evilBalls.length; i++) {
        evilBalls[i].draw();
        evilBalls[i].checkBounds();
        evilBalls[i].collisionDetect();
        evilBalls[i].setControls();
    }

    count();

    requestAnimationFrame(loop);
}

loop();
