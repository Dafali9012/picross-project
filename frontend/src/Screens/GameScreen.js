import ScreenManager from "../utils/ScreenManager.js";
import Button from "../Button.js";
import BackgroundManager from "../utils/BackgroundManager.js";
import BoxGrid from "../BoxGrid.js";

export default class GameScreen extends PIXI.Container {
    constructor(data) {
        super();

        this.textureSheet = data.textureSheet;

        this.isSolvedBound = this.isSolved.bind(this);

        this.boxGrid = new BoxGrid({textureSheet:this.textureSheet, mask:data.mask});
        this.addChild(this.boxGrid);

        this.buttonMenu = new Button(this.textureSheet, "MENU", () => {
            document.removeEventListener("pointerup", this.isSolvedBound);
            ScreenManager.changeScreen("MainMenuScreen");
            BackgroundManager.changeColor("blue");
        });
        this.buttonMenu.position.set(512-this.buttonMenu.width, 288-this.buttonMenu.height);
        this.addChild(this.buttonMenu);

        this.interactive = true;
    }

    randomPuzzle(size) {
        this.boxGrid.scale.set(1,1);
        this.boxGrid.buildGridRandom(size);
        this.boxGrid.pivot.set(this.boxGrid.width/2, this.boxGrid.height/2);
        this.boxGrid.scale.y = 288/this.boxGrid.height*0.9;
        this.boxGrid.scale.x = this.boxGrid.scale.y;
        this.boxGrid.position.set(512/2, 288/2);
        this.boxGrid.buildHints();

        document.removeEventListener("pointerup", this.isSolvedBound);
        document.addEventListener("pointerup", this.isSolvedBound);
    }

    fixedPuzzle(json) {
        this.boxGrid.scale.set(1,1);
        this.boxGrid.buildGrid(json);
        this.boxGrid.pivot.set(this.boxGrid.width/2, this.boxGrid.height/2);
        this.boxGrid.scale.y = 288/this.boxGrid.height*0.9;
        this.boxGrid.scale.x = this.boxGrid.scale.y;
        this.boxGrid.position.set(512/2, 288/2);
        this.boxGrid.buildHints();

        document.removeEventListener("pointerup", this.isSolvedBound);
        document.addEventListener("pointerup", this.isSolvedBound);
    }

    isSolved() {
        console.log("is the puzzle solved?");
        if(this.boxGrid.isSolved()) {
            this.boxGrid.revealResult();
            document.removeEventListener("pointerup", this.isSolvedBound);
        }
    }

    update(delta) {
        //if(this.won) this.revealPicture();
    }
    
}
