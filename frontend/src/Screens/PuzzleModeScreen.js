import Button from "../Button.js";
import ScreenManager from "../utils/ScreenManager.js";

export default class PuzzleModeScreen extends PIXI.Container {
    constructor(data) {
        super();
        
        this.textureSheet = data.textureSheet;

        this.background = new PIXI.Sprite(data.background);
        this.addChild(this.background);

        this.title = new PIXI.AnimatedSprite(data.title.animations["mode_bounce"]);
        this.title.animationSpeed = 0.02;
        this.title.play();
        this.title.anchor.set(0.5);
        this.title.anchor.set(0);
        this.title.position.set((512-this.title.width)/2, 32);
        this.addChild(this.title);

        this.buttonRandom = new Button(this.textureSheet, "text_random", () => {
            ScreenManager.changeScreen("PuzzleSizeScreen").setBackgroundPosition(this.background.x, this.background.y);
        });

        this.buttonRandom.position.set(512/2, this.title.y + this.title.height + this.buttonRandom.height*2);
        this.addChild(this.buttonRandom);

        this.buttonBack = new Button(this.textureSheet, "text_back", () => {
            ScreenManager.previousScreen().setBackgroundPosition(this.background.x, this.background.y);
        });

        this.buttonBack.position.set(512/2, this.buttonRandom.y + this.buttonBack.height);
        this.addChild(this.buttonBack);
    }

    setBackgroundPosition(x, y) {
        this.background.position.set(x, y);
        return this;
    }

    scrollBackground(delta) {
        this.background.x = (this.background.x+0.4*delta<0)?this.background.x+0.4*delta:-32;
        this.background.y = (this.background.y+0.2*delta<0)?this.background.y+0.2*delta:-32;
    }

    update(delta) {
        this.scrollBackground(delta);
    }
}