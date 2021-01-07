import Button from "../Button.js";
import BackgroundManager from "../utils/BackgroundManager.js";
import ScreenManager from "../utils/ScreenManager.js";

export default class PuzzleModeScreen extends PIXI.Container {
    constructor(data) {
        super();
        
        this.resolution = data.resolution;
        this.textureSheet = data.textureSheet;

        this.title = new PIXI.AnimatedSprite(data.title.animations["mode_bounce"]);
        this.title.animationSpeed = 0.02;
        this.title.play();
        this.title.anchor.set(0.5);
        this.title.anchor.set(0);
        this.title.position.set((this.resolution.x-this.title.width)/2, 32);
        this.addChild(this.title);

        this.buttonRandom = new Button(this.textureSheet, "RANDOM", () => {
            ScreenManager.changeScreen("PuzzleSizeScreen");
            BackgroundManager.changeColor("orange");
        });
        this.buttonRandom.position.set(this.resolution.x/2, this.title.y + this.title.height + this.buttonRandom.height*2);
        this.addChild(this.buttonRandom);

        this.buttonTest = new Button(this.textureSheet, "LEVELS", () => {
            ScreenManager.changeScreen("LevelBrowserScreen");
            BackgroundManager.changeColor("orange");
        });
        this.buttonTest.position.set(this.resolution.x/2, this.buttonRandom.y + this.buttonTest.height);
        this.addChild(this.buttonTest);

        this.buttonBack = new Button(this.textureSheet, "BACK", () => {
            ScreenManager.previousScreen();
        });
        this.buttonBack.position.set(this.resolution.x/2, this.buttonTest.y + this.buttonBack.height);
        this.addChild(this.buttonBack);
    }

    refreshTitleColor() {
        this.title.tint = Math.random() * 0xFFFFFF;
    }

    update(delta) {}
}
