import Button from "../Button.js";
import ScreenManager from "../utils/ScreenManager.js";

export default class MainMenuScreen extends PIXI.Container {
    constructor(data) {
        super();

        this.textureSheet = data.textureSheet;

        this.background = new PIXI.Sprite(data.background);
        this.addChild(this.background);

        this.title = new PIXI.AnimatedSprite(data.title.animations["picross_bounce"]);
        this.title.animationSpeed = 0.02;
        this.title.play();
        this.title.anchor.set(0.5);
        this.title.anchor.set(0);
        this.title.position.set((512-this.title.width)/2, 32);
        this.addChild(this.title);
        
        this.buttonPlay = new Button(data.textureSheet, "text_play", ()=>{
            ScreenManager.changeScreen("PuzzleModeScreen").setBackgroundPosition(this.background.x, this.background.y);
        });
        this.buttonPlay.position.set(512/2, this.title.y + this.title.height + this.buttonPlay.height*2);
        this.addChild(this.buttonPlay);

        this.buttonBuild = new Button(data.textureSheet, "text_build", () => {
            // goto: build puzzle screen
        });
        this.buttonBuild.position.set(512/2, this.buttonPlay.y + this.buttonBuild.height);
        this.addChild(this.buttonBuild);
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