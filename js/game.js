"use strict";

class Game {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.obstacles = [];
    this.player = null;
    this.gameIsOver = false;
    this.score = 0;
    this.timer = 60;
    this.clockId = null;
  }

  start() {
    // Append canvas to the DOM, create a Player and start the Canvas loop
    // Save reference to canvas and Create ctx
    this.canvas = document.querySelector("canvas");
    this.ctx = canvas.getContext("2d");

    // Create a new player for the current game
    this.player = new Player(this.canvas, 3);

    // Add event listener for moving the player
    this.handleKeyboard = (event) => {
      //console.log("type", event.type);

      if (event.type === "keydown") {
        if (event.code === "ArrowUp" || event.code === "KeyW") {
          this.player.setDirection("up");
        } else if (event.code === "ArrowDown" || event.code === "KeyS") {
          this.player.setDirection("down");
        } else if (event.code === "ArrowLeft" || event.code === "KeyA") {
          this.player.setDirection("left");
        } else if (event.code === "ArrowRight" || event.code === "KeyD") {
          this.player.setDirection("right");
          // }else if (event.code === "Space") {
          //   this.player.setDirection("right");
        } else if (event.type === "keyup") {
          this.player.setDirection(null);
        }
      } else {
        this.player.setDirection(null);
      }
    };

    // Handle Bullets
    this.bullets = [];
    this.handleMouseDown = (event) => {
      let bullet = new Bullet(this.canvas, this.ctx, this.player.x, this.player.y, event.clientX, event.clientY);
      this.bullets.push(bullet);
    }
    // Any function provided to eventListener
    document.body.addEventListener("keydown", this.handleKeyboard);
    document.body.addEventListener("keyup", this.handleKeyboard);
    this.canvas.addEventListener("mousedown", this.handleMouseDown);

    // Start the canvas requestAnimationFrame loop
    this.clockId = setInterval(() => (this.timer -= 1), 1000);
    this.startLoop();
  }
  printTime() {
    const time = ("0" + this.timer).slice(-2);
    //console.log("seconds: ", time);
    document.getElementById("secDec").innerText = time[0];
    document.getElementById("secUni").innerText = time[1];
  }

  score() {
    this.ctx.save();
    this.ctx.fillStyle = "white";
    this.ctx.clearRect(0, 0, canvas.width, 20);
    this.ctx.font = "bold 12px Courier";
    this.ctx.fillText("SCORE: " + puntos, 10, 20);
    this.ctx.restore();
  }

  startLoop() {

    const loop = () => {
      // We create the obstacles with random y
      let obstaclesCounter = 0;
      if ((Math.random() > 0.95)) {
        let newObstacle = new Obstacle(obstaclesCounter, this.ctx, this.canvas, Math.floor(Math.random() * 4), Math.floor(Math.random() * 2));
        newObstacle.calculateInits();
        this.obstacles.push(newObstacle);
      }


      // 1. UPDATE THE STATE OF PLAYER AND WE MOVE THE OBSTACLES
      this.player.update();
      this.obstacles.forEach((obstacle) => {
        obstacle.move();
      });
      this.bullets.forEach((bullet) => {
        bullet.move();
      });

      // this.player.checkBorder();
      this.checkCollisions();

      // 2. CLEAR THE CANVAS
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      //rotation
      // if (keys[37]) this.r -= 0.05;
      // if (keys[39]) this.r += 0.05;

      // //thrust
      // if (keys[38]) {
      //   this.player.ax = Math.cos(this.r) * 0.05;
      //   this.player.ay = Math.sin(this.r) * 0.05;
      // } else {
      //   this.player.ax = this.ay = 0;
      // }

      // 3. UPDATE THE CANVAS
      // Draw the player
      this.player.update();
      this.player.draw();
      // Draw the enemies
      this.obstacles.forEach((obstacle) => {
        obstacle.draw();
      });


      // Draw the bullets
      this.bullets.forEach((bullet) => {
        bullet.draw();
      });

      this.printTime();

      // 4. TERMINATE LOOP IF GAME IS OVER
      if (!this.gameIsOver && this.timer > 0) {
        //console.log("timer", this.timer);
        window.requestAnimationFrame(loop);
      } else {
        buildGameOver();
      }
    };

    // As loop function will be continuously invoked by
    // the `window` object- `window.requestAnimationFrame(loop)`
    // we need to `start an infinitive loop` till the game is over
    window.requestAnimationFrame(loop);
  }

  checkCollisions() {
    this.obstacles.forEach((obstacle) => {
      if (this.player.didCollide(obstacle) && obstacle.alive) {
        this.gameIsOver = true;
      }
      this.bullets.forEach((bullet) => {
        if (bullet.didCollide(obstacle) !== false && obstacle.alive && bullet.alive) {
          obstacle.kill()
          bullet.kill()
        }
      })
    });
  }
}
