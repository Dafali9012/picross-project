import Puzzle from "../Puzzle.js";
import ScreenManager from "../utils/ScreenManager.js";
import Input from "../utils/Input.js";
import Button from "../Button.js";

export default class GameScreen extends PIXI.Container {
    constructor(data) {
        super();

        this.textureSheet = data.textureSheet;

        this.background = new PIXI.Sprite(data.background);
        this.addChild(this.background);

        this.puzzle = new Puzzle(data);
        this.puzzle.x = (512-this.puzzle.width)/2;
        this.addChild(this.puzzle);

        this.won = false;

        this.interactive = true;

        this.buttonMenu = new Button(this.textureSheet, "text_menu", () => {
            ScreenManager.changeScreen("MainMenuScreen").setBackgroundPosition(this.background.x, this.background.y);
        });

        this.buttonMenu.position.set(this.puzzle.x + this.puzzle.width + (512 - (this.puzzle.x + this.puzzle.width))/2,
                                    this.puzzle.y + this.puzzle.height);
        this.addChild(this.buttonMenu);

        this.buttonRefresh = new Button(this.textureSheet, "text_refresh", () => {
            this.newPuzzle({puzzleSize: this.puzzle.puzzleSize});
        });

        this.buttonRefresh.position.set(this.puzzle.x + this.puzzle.width + (512 - (this.puzzle.x + this.puzzle.width))/2,
                                    this.puzzle.y + this.puzzle.height - this.buttonRefresh.height);
        this.addChild(this.buttonRefresh);
    }

    newPuzzle(data) {
        this.won = false;
        this.on("mouseup", ()=>{
            if(this.puzzle.checkWin()) {
                this.won = true;
                this.removeListener("mouseup");
                this.puzzle.boxBox.children.forEach(x=>{
                    x.removeAllListeners();
                    x.buttonMode = false;
                });
                Input.operation = "";
            }
        });
        
        this.removeChild(this.puzzle);

        if(data.puzzleData) this.puzzle = new Puzzle({textureSheet:this.textureSheet, puzzleData:data.puzzleData});
        else if(data.puzzleSize) this.puzzle = new Puzzle({textureSheet:this.textureSheet, puzzleSize:data.puzzleSize});

        this.puzzle.x = (512-this.puzzle.width)/2;
        this.addChild(this.puzzle);
    }

    setBackgroundPosition(x, y) {
        this.background.position.set(x, y);
        return this;
    }

    scrollBackground(delta) {
        this.background.x = (this.background.x+0.4*delta<0)?this.background.x+0.4*delta:-32;
        this.background.y = (this.background.y+0.2*delta<0)?this.background.y+0.2*delta:-32;
    }

    revealPicture() {
        this.puzzle.boxBox.children.forEach(x=>{
            x.revealColor();
        });
        this.puzzle.fadeOutHints();
        this.puzzle.fadeInTitle();
    }

    update(delta) {
        this.scrollBackground(delta);
        if(this.won) this.revealPicture();
    }
}