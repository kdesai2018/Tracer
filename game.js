// Global Vars
var type = "WebGL";
var appWidth = 512 * 2;
var appHeight = 512 * 1.25;
var playerScaleFactor = new PIXI.Point(.08, .08);
var app;
var player1;
var state;
var timeCounter;

// Initialization Function (begin on menu screen)
function init() {
    // Debug messages
    console.log("Beginning Initialization...");
    PIXI.utils.sayHello(type);
    // Configure App
    app = new PIXI.Application({width: appWidth, height: appHeight});
    app.renderer.backgroundColor = 0xffffff;
    app.renderer.autoDensity = true;
    timeCounter = 0;
    // add created canvas to the html
    document.body.appendChild(app.view);
    // Load Images
    PIXI.loader
    .add('testing', "assets/player1_1.png")
    .load(setup);
}

function gameLoop (delta) {
  requestAnimationFrame(gameLoop);
  //console.log("woooo");
  timeCounter += delta*1.0/10000;
  state(delta);
}

// --- State-Specific Game-Loop Functions ---
function enterState (delta) {
  console.log(timeCounter);
  let complete = moveToward(delta, player1, 200, 200, true, true);
  if (complete) {
    console.log("switching to options state");
    state = optionsPresentedState;
  }
}

function optionsPresentedState (delta) {

}

function dyingState (delta) {

}

function movingState (delta) {

}

function exitState (delta) {
}

var speed = .004;
var deltaCoeff = .001;

function moveToward (delta, sprite, destX, destY, fromLeft, fromTop) {
  let xDone = false;
  let yDone = false;
  if (fromLeft) {
    if (sprite.position.x < destX) {
      sprite.position.x += speed*(delta*deltaCoeff);
    } else {xDone = true;}
  } else {
    if (sprite.position.x > destX) {
      sprite.position.x -= speed*(delta*deltaCoeff);
    } else {xDone = true;}
  }
  if (fromTop) {
    if (sprite.position.y < destY) {
      sprite.position.y += speed*(delta*deltaCoeff);
    } else {yDone = true;}
  } else {
    if (sprite.position.y > destY) {
      sprite.position.y -= speed*(delta*deltaCoeff);
    } else {yDone = true;}
  }
  return xDone && yDone
}

function setup() {
  // Initialize sprites
  player1 = new PIXI.Sprite(PIXI.loader.resources['testing'].texture);
  // text = new PIXI.Sprite(PIXI.loader.resources['code_text'].texture);
  console.log("after new sprite has been creater")
  player1.position.x = -100;
  player1.position.y = -100;
  player1.scale = playerScaleFactor;
  app.stage.addChild(player1);

  // var code = "int a = 1; \n\n int b = 6; \n\n while (b > 0) {\n\na = a + 1;\n\nb = b - 1;\n\n}\n\nSystem.out.println(\"Finshed\");";
  var code = "\n\nboolean inLoop = true;\n\n"+
  "int number = 0;\n\n"+
  "int numberTwo = 0;\n\n"+
  "while(inLoop) {\n\n"+
  "if(number * numberTwo > 7) {\n\n"+
  "inLoop = false;\n\n}"+
  "\n\nif(number < 2) {\n\n"+
          "inLoop = true;\n\n"+
      "}\n"+
      "number = number + 1;\n\n"+
      "numberTwo = numberTwo + 2;\n"+
  "}\n\n";
  
  var text = new PIXI.Text(code,{fontFamily : 'Arial', fontSize: 24, fill : 0x000000, align : 'left'});
  app.stage.addChild(text);



  
  console.log("START NOW");
  app.ticker.add(delta => gameLoop(delta))
  state = enterState;
}

// function getText(File f) {

// }

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