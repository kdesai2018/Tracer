// Global Vars
var type = "WebGL";
var appWidth = 512 * 2;
var appHeight = 512 * 1.25;
var app;
var player1;

// Initialization Function (begin on menu screen)
function init() {
    // Debug messages
    console.log("init() successfully called.");
    PIXI.utils.sayHello(type);
    // Configure App
    app = new PIXI.Application({width: appWidth, height: appHeight});
    app.renderer.backgroundColor = 0xffffff;
    app.renderer.autoDensity = true;
    // add created canvas to the html
    document.body.appendChild(app.view);
    // Load Images

    PIXI.loader
    .add('testing', "assets/temp_stick_figure.png")
    .add('code_test', "level1.txt")
    .load(setup);
    app.ticker.add(delta => gameLoop(delta))
    requestAnimationFrame(gameLoop);
}

function gameLoop (delta) {
  // not used rn what the fuck why is this here  
  //console.log("woooo");
}

function update() {
  // not used right now
}

function setup() {
  // Initialize sprites
  player1 = new PIXI.Sprite(PIXI.loader.resources['testing'].texture);
  // text = new PIXI.Sprite(PIXI.loader.resources['code_text'].texture);
  console.log("after new sprite has been creater")
  player1.position.x = 100;
  player1.position.y = 100;
  app.stage.addChild(player1);

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
