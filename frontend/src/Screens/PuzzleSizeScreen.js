import ScreenManager from "../utils/ScreenManager.js";
import Button from "../Button.js";

export default class PuzzleSizeScreen extends PIXI.Container {
    constructor(data) {
        super();

        this.textureSheet = data.textureSheet;

        this.background = new PIXI.Sprite(data.background);
        this.addChild(this.background);

        this.title = new PIXI.AnimatedSprite(data.title.animations["size_bounce"]);
        this.title.animationSpeed = 0.02;
        this.title.play();
        this.title.anchor.set(0.5);
        this.title.anchor.set(0);
        this.title.position.set((512-this.title.width)/2, 32);
        this.addChild(this.title);

        this.buttonFive = new Button(this.textureSheet, "text_5x5", () => {
            ScreenManager.changeScreen("GameScreen").setBackgroundPosition(this.background.x, this.background.y).newPuzzle({puzzleSize:5});
        });

        this.buttonFive.position.set(512/2, this.title.y + this.title.height + this.buttonFive.height*2);
        this.addChild(this.buttonFive);

        this.buttonTen = new Button(this.textureSheet, "text_10x10", () => {
            ScreenManager.changeScreen("GameScreen").setBackgroundPosition(this.background.x, this.background.y).newPuzzle({puzzleSize:10});
        });

        this.buttonTen.position.set(512/2, this.buttonFive.y + this.buttonTen.height);
        this.addChild(this.buttonTen);

        this.buttonFifteen = new Button(this.textureSheet, "text_15x15", () => {
            ScreenManager.changeScreen("GameScreen").setBackgroundPosition(this.background.x, this.background.y).newPuzzle({puzzleSize:15});
        });

        this.buttonFifteen.position.set(512/2, this.buttonTen.y + this.buttonFifteen.height);
        this.addChild(this.buttonFifteen);

        this.buttonBack = new Button(this.textureSheet, "text_back", () => {
            ScreenManager.previousScreen().setBackgroundPosition(this.background.x, this.background.y);
        });

        this.buttonBack.position.set(512/2, this.buttonFifteen.y + this.buttonBack.height);
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