import Puzzle from "../Puzzle.js";

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
        this.on("mouseup", ()=>{
            console.log("checking win");
            if(this.puzzle.checkWin()) {
                this.won = true;
                this.removeListener("mouseup");
                this.puzzle.boxBox.children.forEach(x=>{
                    x.removeAllListeners();
                    x.buttonMode = false;
                });
            }
        });
    }

    scrollBackground(delta) {
        this.background.x = (this.background.x+0.4*delta<0)?this.background.x+0.4*delta:-32;
        this.background.y = (this.background.y+0.2*delta<0)?this.background.y+0.2*delta:-32;
    }

    revealPicture() {
        this.puzzle.boxBox.children.forEach(x=>{
            x.revealColor();
        });
    }

    update(delta) {
        this.scrollBackground(delta);
        this.puzzle.update(delta);

        if(this.won) this.revealPicture();
    }
}