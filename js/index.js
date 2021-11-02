// General function that will update the HTML content dinamically
const buildDom = (html) => {
  const main = document.querySelector("main");
  main.innerHTML = html;
};

// First Screen => Splash Screen
const buildSplashScreen = () => {
  buildDom(`
  <img src="./images/logo.png" alt="" style="width:50%;" />
  <br />
  <button id="start-button">Start Game</button>
  `);
  const startButton = document.getElementById("start-button");
  startButton.addEventListener("click", buildGameScreen);

  // ()=> {console.log("go")
  //   setTimeout(()=>{buildGameScreen()}, 10000 )})
};

// Second Screen => Game Screen
const buildGameScreen = () => {
  buildDom(`
  <section id="clock">
        <span>TIME: </span>
        <span id="secDec" class="number">0</span>
        <span id="secUni" class="number">0</span>
  </section>
  <div id="game-board">
  <canvas id="canvas" width="1000" height="600"></canvas>
  </div>  
  <P></P>
  <button id="end-button">End Game</button>
  `);

  const endButton = document.getElementById("end-button");
  endButton.addEventListener("click", buildGameOver);

  const game = new Game();
  game.start();
};

// Third Screen => Game Over
const buildGameOver = () => {
  buildDom(`
  <section class="game-over">
  <h1>Game Over</h1>
  <button id = "game"> TRY AGAIN</button>
  <div class= "pointer"> 
  <img src="./images/gameover.jpeg" alt="" style="width:50%;" />
  <br />
  </div>
  </section>
  `);

  const restartButton = document.querySelector("button");
  restartButton.addEventListener("click", buildGameScreen);
};

const buildYouWin = () => {
  buildDom(`
  <section class="You-Win">
  <h1>You Win</h1>
  <button id = "game"> TRY AGAIN</button>
  <div class= "pointer"> 
  <img src="../images/background.jpeg" alt="" style="width:50%;" />
  <br />
  </div>
  </section>
  `);

  const restartButton = document.querySelector("button");
  restartButton.addEventListener("click", buildGameScreen);
};

// When the window loads, then we will run the "buildSplashScreen" function
// "load" waits for the html and JS
window.addEventListener("load", buildSplashScreen);
