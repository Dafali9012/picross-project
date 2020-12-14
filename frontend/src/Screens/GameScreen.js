import Puzzle from "../Puzzle.js";
import ScreenManager from "../utils/ScreenManager.js";
import Input from "../utils/Input.js";

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
        let sound = PIXI.sound.Sound.from({
            url: "./res/sound/select.mp3",
            autoPlay: true,
        });

        this.menuButton = new PIXI.Sprite(this.textureSheet.textures["menuButton_up"]);
        this.addChild(this.menuButton);
        this.menuButton.position.set((512-this.puzzle.width)/2 + this.puzzle.width + (((512-this.puzzle.width)/2-this.menuButton.width)/2), this.puzzle.height-this.menuButton.height/2);
        this.menuButton.interactive = true;
        this.menuButton.buttonMode = true;

        this.menuButton.on("click", ()=>{
            console.log("GOTO: menu");
        });
        this.menuButton.on("mousedown", ()=>{
            this.menuButton.texture = this.textureSheet.textures["menuButton_down"];
        });
        this.menuButton.on("mouseout", ()=> {
            this.menuButton.texture = this.textureSheet.textures["menuButton_up"];
        });
        this.menuButton.on("mouseup", ()=> {
            this.menuButton.texture = this.textureSheet.textures["menuButton_up"];
            ScreenManager.previousScreen();
            sound.play();
        });
        
        this.interactive = true;
    }

    newPuzzle(puzzleData) {
        this.won = false;
        this.on("mouseup", ()=>{
            console.log("checking win");
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
        if(puzzleData) this.puzzle = new Puzzle({textureSheet:this.textureSheet, background:this.background, puzzleData:puzzleData});
        else this.puzzle = new Puzzle({textureSheet:this.textureSheet, background:this.background});
        this.puzzle.x = (512-this.puzzle.width)/2;
        this.addChild(this.puzzle);
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