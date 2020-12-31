import Button from "../Button.js";
import ScreenManager from "../utils/ScreenManager.js";

export default class MainMenuScreen extends PIXI.Container {
    constructor(data) {
        super();

        this.textureSheet = data.textureSheet;

        this.title = new PIXI.AnimatedSprite(data.title.animations["picross_bounce"]);
        this.title.animationSpeed = 0.02;
        this.title.play();
        this.title.anchor.set(0.5);
        this.title.anchor.set(0);
        this.title.position.set((512-this.title.width)/2, 32);
        this.title.tint = Math.random() * 0xFFFFFF;
        this.addChild(this.title);
        
        this.buttonPlay = new Button(data.textureSheet, "text_play", ()=>{
            ScreenManager.changeScreen("PuzzleModeScreen").refreshTitleColor();
        });
        this.buttonPlay.position.set(512/2, this.title.y + this.title.height + this.buttonPlay.height*2);
        this.addChild(this.buttonPlay);

        this.buttonBuild = new Button(data.textureSheet, "text_build", () => {
            // goto: build puzzle screen
        });
        this.buttonBuild.position.set(512/2, this.buttonPlay.y + this.buttonBuild.height);
        this.addChild(this.buttonBuild);
    }

    refreshTitleColor() {
        this.title.tint = Math.random() * 0xFFFFFF;
    }

    update(delta) {}
}
