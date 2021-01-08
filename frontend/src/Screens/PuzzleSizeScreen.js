import ScreenManager from "../utils/ScreenManager.js";
import Button from "../Button.js";
import BackgroundManager from "../utils/BackgroundManager.js";

export default class PuzzleSizeScreen extends PIXI.Container {
    constructor(data) {
        super();

        this.resolution = data.resolution;
        this.textureSheet = data.textureSheet;

        this.title = new PIXI.AnimatedSprite(data.title.animations["size_bounce"]);
        this.title.animationSpeed = 0.04;
        this.title.play();
        this.title.scale.set(2);
        this.title.position.set((this.resolution.x-this.title.width)/2, (this.resolution.y/2-this.title.height)/2);
        this.addChild(this.title);

        this.buttonFive = new Button(this.textureSheet, "5x5", ()=>this.randomGame(5));
        this.buttonFive.position.set(this.resolution.x/2, this.resolution.y/2);
        this.addChild(this.buttonFive);

        this.buttonTen = new Button(this.textureSheet, "10x10", ()=>this.randomGame(10));
        this.buttonTen.position.set(this.resolution.x/2, this.buttonFive.y + this.buttonTen.height);
        this.addChild(this.buttonTen);

        this.buttonFifteen = new Button(this.textureSheet, "15x15", ()=>this.randomGame(15));
        this.buttonFifteen.position.set(this.resolution.x/2, this.buttonTen.y + this.buttonFifteen.height);
        this.addChild(this.buttonFifteen);

        this.buttonBack = new Button(this.textureSheet, "BACK", ()=>ScreenManager.previousScreen().enter());
        this.buttonBack.position.set(this.resolution.x/2, this.buttonFifteen.y + this.buttonBack.height);
        this.addChild(this.buttonBack);
    }

    randomGame(size) {
        BackgroundManager.changeColor("white");
        ScreenManager.changeScreen("GameScreen").randomPuzzle(size);
    }

    fixedGame(json) {
        BackgroundManager.changeColor("white");
        ScreenManager.changeScreen("GameScreen").fixedPuzzle(json);
    }

    update(delta) {}
}
