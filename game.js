// Global Vars
var type = "WebGL";
var appWidth = 512 * 2;
var appHeight = 512 * 1.25;
var app;
var player1;
var state;

// Initialization Function (begin on menu screen)
function init() {
  var port = 8000;
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
    .add('testing', "assets/temp_stick_figure.png")
    .add('code_test', "level1.txt")
    .load(setup);
    app.ticker.add(delta => gameLoop(delta))
    state = enterState;
}

function gameLoop (delta) {
  requestAnimationFrame(gameLoop);
  console.log("woooo");
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
  // player1 = new PIXI.Sprite(PIXI.loader.resources['testing'].texture);
  // text = new PIXI.Sprite(PIXI.loader.resources['code_text'].texture);
  // console.log("after new sprite has been creater")
  // player1.position.x = 100;
  // player1.position.y = 100;
  // app.stage.addChild(player1);


  var code = "int a = 1; \n\n int b = 6; \n\n while (b > 0) {\n\na = a + 1;\n\nb = b - 1;\n\n}\n\nSystem.out.println(\"Finshed\");";
  var text = new PIXI.Text(code,{fontFamily : 'Arial', fontSize: 40, fill : 0x000000, align : 'center'});
  app.stage.addChild(text);

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
