import Button from "../Button.js";
import ScreenManager from "../utils/ScreenManager.js";
import BackgroundManager from "../utils/BackgroundManager.js";
import BrowserWindow from "../BrowserWindow.js";


export default class LevelBrowserScreen extends PIXI.Container{
    constructor(data) {
        super()

        this.textureSheet = data.textureSheet;
        
        this.addChild(new BrowserWindow);

        this.title = new PIXI.AnimatedSprite(data.title.animations["mode_bounce"]);
        this.title.animationSpeed = 0.02;
        this.title.play();
        this.title.anchor.set(0.5);
        this.title.anchor.set(0);
        this.title.position.set((512-this.title.width)/2, 32);
        this.addChild(this.title);
        
        

        this.buttonBack = new Button(this.textureSheet, "BACK", () => {
            //ScreenManager.previousScreen();
            this.fixedGame(data.presentationPuzzle);
        });
        this.buttonBack.position.set(512/2, this.title.y + this.title.height + this.buttonBack.height*2);
        this.addChild(this.buttonBack);
    }

    fixedGame(json) {
        BackgroundManager.changeColor("white");
        ScreenManager.changeScreen("GameScreen").fixedPuzzle(json);
    }

    update(delta) {}
}