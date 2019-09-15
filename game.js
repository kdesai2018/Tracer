// Global Vars
var type = "WebGL";
var appWidth = 512 * 2;
var appHeight = 512 * 1.25;
var app;
var player1;
var state;
const player1Frames = [ 
  "assets/player1_1.png",
  "assets/player1_2.png",
  "assets/player1_3.png",
  "assets/player1_4.png",
];

const player2Frames = [ 
  "assets/player2_1.png",
  "assets/player2_2.png",
  "assets/player2_3.png",
  "assets/player2_4.png",
];

const player3Frames = [ 
  "assets/player3_1.png",
  "assets/player3_2.png",
  "assets/player3_3.png",
  "assets/player3_4.png",
];

const player4Frames = [ 
  "assets/player4_1.png",
  "assets/player4_2.png",
  "assets/player4_3.png",
  "assets/player4_4.png",
];

// Initialization Function (begin on menu screen)
function init() {
    // Debug messages
    console.log("Beginning Initialization...");
    PIXI.utils.sayHello(type);
    // Configure App
    app = new PIXI.Application({width: appWidth, height: appHeight});
    app.renderer.backgroundColor = 0xffffff;
    app.renderer.autoDensity = true;
    // add created canvas to the html
    document.body.appendChild(app.view);
    // Load Images
    
    PIXI.loader
        .add('code_test', "level1.txt")
        .add(player1Frames)
        .add(player2Frames)
        .add(player3Frames)
        .add(player4Frames)
        .load(setup);
    app.ticker.add(delta => gameLoop(delta))
    state = enterState;
}

function gameLoop (delta) {
  requestAnimationFrame(gameLoop);
  state(delta);
}

// --- State-Specific Game-Loop Functions ---
function enterState (delta) {

}

function optionsPresentedState (delta) {

}

function dyingState (delta) {

}

function movingState (delta) {

}

function exitState (delta) {


}

function setup() {
  // Initialize sprites
  player1 = PIXI.extras.AnimatedSprite.fromFrames(player1Frames);
  // text = new PIXI.Sprite(PIXI.loader.resources['code_text'].texture);
  console.log("after new sprite has been creater")
  player1.scale.y = .375
  player1.scale.x = .375
  player1.position.x = 100;
  player1.position.y = 100;
  app.stage.addChild(player1);
  player1.animationSpeed = .15;
  player1.play();

  const fileURL = 'level1.txt';

  fetch(fileURL).then(r => r.text()).then(t => console.log(t));


  // const fs = require('fs');
  // fs.readFile('level1.txt', 'utf-8', (err,data) => {
  //   if (err) throw error;
  //   console.log(data);
  // })



  // app.stage.addChild(text);

  // app.ticker.add(delta => gameLoop(delta)); //time increment
  
  console.log("START NOW");
  // startGame(); // method that stars displaying text and shit
}

// function startGame() {
//   // var textSample = new PIXI.Sprite();
//   textSample.position.set(20);
//   app.stage.addChild(textSample);

// }

// Keyboard Controls
function keyboard(keyCode) {
    let key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    // Down
    key.downHandler = event => {
        console.log("DOWN");
      if (event.keyCode === key.code) {
        if (key.isUp && key.press) key.press();
          key.isDown = true;
          key.isUp = false;
        }
        event.preventDefault();
    };
    // Up
    key.upHandler = event => {
        console.log("UP");
      if (event.keyCode === key.code) {
        if (key.isDown && key.release) key.release();
          key.isDown = false;
          key.isUp = true;
        }
        event.preventDefault();
    };
    //Attach event listeners
    window.addEventListener(
      "keydown", key.downHandler.bind(key), false
    );
    window.addEventListener(
      "keyup", key.upHandler.bind(key), false
    );
    return key;
  }
