import ScreenManager from "../utils/ScreenManager.js";
import Button from "../Button.js";
import BackgroundManager from "../utils/BackgroundManager.js";
import BoxGrid from "../BoxGrid.js";
import Hints from "../Hints.js";

export default class GameScreen extends PIXI.Container {
    constructor(data) {
        super();

        this.textureSheet = data.textureSheet;

        this.isSolvedBound = this.isSolved.bind(this);

        this.boxGrid = new BoxGrid({textureSheet:this.textureSheet, mask:data.mask});
        this.addChild(this.boxGrid);

        this.hints = new Hints();
        this.addChild(this.hints);

        this.title = new PIXI.Text("", {
            fontFamily:"myFont",
            fontSize:16, fill:0xFFFFFF,
            stroke:0x000000,
            strokeThickness:1.6,
            align:"center"
        });
        this.title.scale.set(0.5);
        this.addChild(this.title);
        this.title.alpha = 0;

        this.buttonMenu = new Button(this.textureSheet, "MENU", () => {
            this.title.alpha = 0;
            document.removeEventListener("pointerup", this.isSolvedBound);
            this.hints.removeChildren();
            ScreenManager.changeScreen("MainMenuScreen");
            BackgroundManager.changeColor("blue");
        });
        this.buttonMenu.position.set(512-this.buttonMenu.width, 288-this.buttonMenu.height);
        this.addChild(this.buttonMenu);

        this.interactive = true;
    }

    randomPuzzle(size) {
        this.title.text = "Complete!";
        this.title.position.set((512-this.title.width)/2, this.title.height*2);
        this.buildPuzzle(()=>this.boxGrid.buildGridRandom(size));
    }

    fixedPuzzle(json) {
        this.title.text = json.meta.title;
        this.title.position.set((512-this.title.width)/2, this.title.height*2);
        this.buildPuzzle(()=>this.boxGrid.buildGrid(json));
    }

    buildPuzzle(puzzleCallback) {
        this.boxGrid.scale.set(1,1);
        puzzleCallback();
        this.boxGrid.pivot.set(this.boxGrid.width/2, this.boxGrid.height/2);
        this.boxGrid.scale.y = 288/this.boxGrid.height*0.8;
        this.boxGrid.scale.x = this.boxGrid.scale.y;
        this.boxGrid.position.set(512/2, 288/2+(288-this.boxGrid.height)/2-16);

        this.buildHints();

        document.removeEventListener("pointerup", this.isSolvedBound);
        document.addEventListener("pointerup", this.isSolvedBound);
    }

    buildHints() {
        this.hints.removeChildren();
        this.hints.buildHints(this.boxGrid.getBoxMap(), this.boxGrid.scale.y);
        this.hints.position.set(this.boxGrid.x-this.boxGrid.width/2,this.boxGrid.y-this.boxGrid.height/2);
    }

    isSolved() {
        console.log("is the puzzle solved?");
        if(this.boxGrid.isSolved()) {
            this.title.alpha = 1;
            this.boxGrid.revealResult();
            this.hints.removeChildren();
            document.removeEventListener("pointerup", this.isSolvedBound);
        }
    }

    update(delta) {
        //if(this.won) this.revealPicture();
    }
    
}
