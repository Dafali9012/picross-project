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

        this.buttonBack = new Button(this.textureSheet.textures["button"], 2, "BACK", () => {
            ScreenManager.previousScreen();
        });
        this.buttonBack.position.set(this.resolution.x/2, this.resolution.y-32-this.buttonBack.height/2);
        this.addChild(this.buttonBack);
    }

    updatePuzzles() {
        console.log("updating puzzles");
        this.removeChild(this.browserWindow);
        this.browserWindow = new BrowserWindow({
            textureSheet:this.textureSheet,
            resolution:this.resolution
        });
        this.browserWindow.position.set((this.resolution.x-this.browserWindow.width)/2, this.title.y+this.title.height+32);
        this.addChild(this.browserWindow);
        this.browserWindow.background.height = this.resolution.y - this.title.height - this.buttonBack.height - 128;
        this.browserWindow.browserMask.height = this.browserWindow.background.height;
    }

    fixedGame(json) {
        BackgroundManager.changeColor("white");
        ScreenManager.changeScreen("GameScreen").fixedPuzzle(json);
    }

    update(delta) {}
}
