import Game from "./Game.js";

let font = new FontFaceObserver("myFont");
font.load().then(()=>{
    new Game();
});
