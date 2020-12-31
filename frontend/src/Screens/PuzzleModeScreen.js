import Button from "../Button.js";
import ScreenManager from "../utils/ScreenManager.js";

export default class PuzzleModeScreen extends PIXI.Container {
    constructor(data) {
        super();
        
        this.textureSheet = data.textureSheet;

        this.title = new PIXI.AnimatedSprite(data.title.animations["mode_bounce"]);
        this.title.animationSpeed = 0.02;
        this.title.play();
        this.title.anchor.set(0.5);
        this.title.anchor.set(0);
        this.title.position.set((512-this.title.width)/2, 32);
        this.title.tint = Math.random() * 0xFFFFFF;
        this.addChild(this.title);

        this.buttonRandom = new Button(this.textureSheet, "text_random", () => {
            ScreenManager.changeScreen("PuzzleSizeScreen").refreshTitleColor();
        });

        this.buttonRandom.position.set(512/2, this.title.y + this.title.height + this.buttonRandom.height*2);
        this.addChild(this.buttonRandom);

        this.buttonBack = new Button(this.textureSheet, "text_back", () => {
            ScreenManager.previousScreen().refreshTitleColor();
        });

        this.buttonBack.position.set(512/2, this.buttonRandom.y + this.buttonBack.height);
        this.addChild(this.buttonBack);
    }

    refreshTitleColor() {
        this.title.tint = Math.random() * 0xFFFFFF;
    }

    update(delta) {}
}
