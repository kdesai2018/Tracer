// Global Vars
var type = "WebGL";
var appWidth = 512 * 2;
var appHeight = 512 * 1.25;
var playerScaleFactor = new PIXI.Point(.06, .06);
var heartScaleFactor = new PIXI.Point(.35, .35);
var indicatorScaleFactor = new PIXI.Point(.1, .1);
var hearts = [];
var lineOptions = [
  [2, 4, 14, 0],
  [3, 5, 8, 0],
  [4, 8, 14, 0],
  [5, 8, 14, 0],
  [6, 8, 14, 1],
  [9, 11, 14, 0],
  [4, 11, 14, 1],
  [1, 12, 14, 1],
  [4, 8, 14, 0],
  [5, 8, 14, 0],
  [6, 8, 11, 1],
  [9, 11, 14, 0],
  [3, 11, 14, 1],
  [1, 5, 12, 2],
  [3, 8, 4, 1],
  [5, 8, 12, 0],
  [6, 8, 11, 0],
  [8, 9, 14, 0],
  [9, 11, 14, 1],
  [4, 5, 12, 2],
  [1, 4, 5, 2],
  [5, 14, 11, 1]
];
var optionIndicatorTracker = [];  // 2d array initialized to false
var backdrop;
var startingLives = 3;
var livesCount;
var currLine;
var app;
var player1;
var state;
player1Indicators = [];
player2Indicators = [];
player3Indicators = [];
player4Indicators = [];
indicatorNames = ["p1a", "p1b", "p1c", "p2a", "p2b", "p2c", "p3a", "p3b", "p3c", "p4a", "p4b", "p4c"];
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
var timeCounter;

// Initialization Function (begin on menu screen)
function init() {
    // Debug messages
    console.log("Beginning Initialization...");
    PIXI.utils.sayHello(type);
    // Configure App
    app = new PIXI.Application({width: appWidth, height: appHeight});
    app.renderer.backgroundColor = 0x00ffff;
    app.renderer.autoDensity = true;
    timeCounter = 0;
    livesCount = startingLives;
    currLine = 1;
    // add created canvas to the html
    document.body.appendChild(app.view);

    for (var i=0; i<optionIndicatorTracker.length; i++) {
      for (var j=0; j<2; j++) {
        optionIndicatorTracker[i][j] = false;
      }
    }
    // Load Images
    
    PIXI.loader
        .add('code_test', "level1.txt")
        .add(player1Frames)
        .add(player2Frames)
        .add(player3Frames)
        .add(player4Frames)
        .add("p1a", "assets/player1_a.png")
        .add("p1b", "assets/player1_b.png")
        .add("p1c", "assets/player1_c.png")
        .add("p2a", "assets/player2_a.png")
        .add("p2b", "assets/player2_b.png")
        .add("p2c", "assets/player2_c.png")
        .add("p3a", "assets/player3_a.png")
        .add("p3b", "assets/player3_b.png")
        .add("p3c", "assets/player3_c.png")
        .add("p4a", "assets/player4_a.png")
        .add("p4b", "assets/player4_b.png")
        .add("p4c", "assets/player4_c.png")
        .add("heart", "assets/life_symbol.png")
        .add("backdrop", "assets/backdrop.png")
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
  //console.log(timeCounter);
  let complete = moveToward(delta, player1, 600, 200, true, true);
  if (complete) {
    console.log("switching to options state");
    for (var i=0; i<lineOptions[currLine+1]; i++) {
      let indicatorToLine = lineOptions[currLine+1][i];
    }
    
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

function presentOptions() {

}

var xSpeed = .004;
var deltaCoeff = .001;

function moveToward (delta, sprite, destX, destY, fromLeft, fromTop) {
  let xDone = false;
  let yDone = false;
  let ySpeed = Math.abs((destY - sprite.position.y)*1.0/(destX - sprite.position.x))*xSpeed;
  if (fromLeft) {
    if (sprite.position.x < destX) {
      sprite.position.x += xSpeed*(delta*deltaCoeff);
    } else {xDone = true;}
  } else {
    if (sprite.position.x > destX) {
      sprite.position.x -= xSpeed*(delta*deltaCoeff);
    } else {xDone = true;}
  }
  if (fromTop) {
    if (sprite.position.y < destY) {
      sprite.position.y += ySpeed*(delta*deltaCoeff);
    } else {yDone = true;}
  } else {
    if (sprite.position.y > destY) {
      sprite.position.y -= ySpeed*(delta*deltaCoeff);
    } else {yDone = true;}
  }
  return xDone && yDone
}

function setupPlayer(player){
  player.position.x = -100;
  player.position.y = -100;
  player.scale = playerScaleFactor;
  app.stage.addChild(player);
  player.animationSpeed = .15;
  player.play();
}

function setup() {
  // Initialize sprites

  backdrop = new PIXI.Sprite(PIXI.loader.resources['backdrop'].texture);
  app.stage.addChild(backdrop);

  player1 = PIXI.extras.AnimatedSprite.fromFrames(player1Frames);
  player2 = PIXI.extras.AnimatedSprite.fromFrames(player2Frames);
  player3 = PIXI.extras.AnimatedSprite.fromFrames(player3Frames);
  player4 = PIXI.extras.AnimatedSprite.fromFrames(player4Frames);
  // text = new PIXI.Sprite(PIXI.loader.resources['code_text'].texture);
  console.log("after new sprite has been creater")
  setupPlayer(player1);

  console.log("player " + player1);

  for (var i=0; i<indicatorNames.length; i++) {
    let nextIndicator = new PIXI.Sprite(PIXI.loader.resources[indicatorNames[i]].texture);
    nextIndicator.scale = indicatorScaleFactor;
    nextIndicator.x = -100;
    nextIndicator.y = -100;
    if (i/4 == 0) {
      player1Indicators[i%4] = nextIndicator;
    }
    if (i/4 == 1) {
      player2Indicators[i%4] = nextIndicator;
    }
    if (i/4 == 2) {
      player3Indicators[i%4] = nextIndicator;
    }
    if (i/4 == 3) {
      player4Indicators[i%4] = nextIndicator;
    }
    app.stage.addChild(nextIndicator);
  }

  // initialize sound effort 
  var zap = createAudio('audio/backstreet.mp3',{volume:0.3});

  let heartX = 850;
  let heartY = 30;
  for (var i=0; i<startingLives; i++) {
    singleHeart = new PIXI.Sprite(PIXI.loader.resources['heart'].texture);
    singleHeart.scale = heartScaleFactor;
    singleHeart.x = heartX;
    singleHeart.y = heartY;
    heartX += 40;
    hearts[i]=singleHeart;
    app.stage.addChild(hearts[i]);
    console.log(hearts[i]);
  }
  zap.play();

  // var code = "int a = 1; \n\n int b = 6; \n\n while (b > 0) {\n\na = a + 1;\n\nb = b - 1;\n\n}\n\nSystem.out.println(\"Finshed\");";
  var code = [];
  code.push("boolean inLoop = true;\n");
  code.push("int number = 0;\n");
  code.push("int numberTwo = 0;\n");
  code.push("while (inLoop) {\n");
  code.push("\t\t\t\tif (number * numberTwo > 7) {\n");
  code.push("\t\t\t\t\t\t\t\tinLoop = false;");

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
  var init_x = 10;
  var code_render = [];
  for (var i = 0; i < code.length; i++) {
    if (code[i].includes("}")) {
      init_x -= 20;
    }
    code_render.push(new PIXI.Text(" "+ code[i], {fontFamily : 'Helvetica', fontSize: 20, fill : 0x000000, align : 'left'}));
    code_render[i].position.y = init_x;
    init_x += 45;     // edit this to change space between lines...should be const b/c hardcoding oops
    app.stage.addChild(code_render[i]);
  }
  
  console.log("START NOW");
  app.ticker.add(delta => gameLoop(delta))
  state = enterState;
}

function createAudio(src, options) {
  var audio = document.createElement('audio');
  audio.volume = options.volume || 0.5;
  audio.loop   = options.loop;
  audio.src    = src;
  return audio;
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
