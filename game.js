//the following if-statement decides if the browser is going to render
//the application with WebGL or canvas
let type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
  type = 'canvas'
}

//this print a message on the console. use dev tools to see
PIXI.utils.sayHello(type)

//Create a Pixi Application
//There are more properties that can be altered
//look at the documentation for PIXI.Application
let appWidth = 512 * 2
    appHeight = 512 * 1.25
let app = new PIXI.Application({width: appWidth, height: appHeight});
//app.renderer.backgroundColor = 0x061639
app.renderer.autoResize = true


//add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view)

//PIXI.loader takes in paths for images and renders it so that they cna be used
//for textures
/*PIXI.loader
  .add([
  ])
  .load(setup)
  */