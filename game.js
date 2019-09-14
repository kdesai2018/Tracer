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
    // // Render type
    // if(!PIXI.utils.isWebGLSupported()){
    //     type = 'canvas';
    // }
    // Configure App
    app = new PIXI.Application({width: appWidth, height: appHeight});
    app.renderer.backgroundColor = 0xfff00f;
    app.renderer.autoResize = true;
    // add created canvas to the html
    document.body.appendChild(app.view);
    // Load Images
    PIXI.loader
    .add('testing', 'https://en.wikipedia.org/wiki/File:Stick_figure.png'
    )
    .load(setup);
    app.ticker.add(delta => gameLoop(delta))
    requestAnimationFrame(gameLoop);
}

function gameLoop (delta) {
    console.log("woooo");
}

function update() {
    console.log("woooo");
}

function setup() {
    // Initialize sprites
    player1 = new PIXI.Sprite(PIXI.loader.resources['testing'].texture);
    player1.anchor.x = 100;
    player1.anchor.y = 100;
    app.stage.addChild(player1);

    spacebar = keyboard(32);

    spacebar.press = () => {
      spacePressed = true
    }
    spacebar.release = () => {
      spacePressed = false
    }
    //app.ticker.add(delta => gameLoop(delta)); //time increment
    
    console.log("START NOW");
    //startGame()
}

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

/*PIXI.loader
  .add([
  ])
  .load(setup)
  */