import Button from "../Button.js";
import ScreenManager from "../utils/ScreenManager.js";
import BackgroundManager from "../utils/BackgroundManager.js";
import BrowserWindow from "../BrowserWindow.js";

export default class LevelBrowserScreen extends PIXI.Container{
    constructor(data) {
        super()

        this.resolution = data.resolution;
        this.textureSheet = data.textureSheet;
        
        this.title = new PIXI.AnimatedSprite(data.title.animations["puzzles_bounce"]);
        this.title.animationSpeed = 0.04;
        this.title.play();
        this.title.scale.set(2);
        this.title.position.set((this.resolution.x-this.title.width)/2, 32);
        this.addChild(this.title);
        

        this.browserWindow = new BrowserWindow({
            resolution:data.resolution,
            fetchFinish:this.afterFetch.bind(this)
        });
        this.browserWindow.position.set((this.resolution.x-this.browserWindow.width)/2, this.title.y+this.title.height+32);
        this.addChild(this.browserWindow);
    }

    afterFetch() {
        this.buttonBack = new Button(this.textureSheet, "BACK", () => {
            ScreenManager.previousScreen();
        });
        this.buttonBack.position.set(this.resolution.x/2, this.browserWindow.y + this.browserWindow.height + 32 + this.buttonBack.height/2);
        this.addChild(this.buttonBack);
    }

    fixedGame(json) {
        BackgroundManager.changeColor("white");
        ScreenManager.changeScreen("GameScreen").fixedPuzzle(json);
    }

    update(delta) {}
}
