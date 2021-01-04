import ScreenManager from "../utils/ScreenManager.js";
import Button from "../Button.js";
import BackgroundManager from "../utils/BackgroundManager.js";
import BoxGrid from "../BoxGrid.js";

export default class GameScreen extends PIXI.Container {
    constructor(data) {
        super();

        this.textureSheet = data.textureSheet;

        this.boxGrid = new BoxGrid({textureSheet:this.textureSheet, mask:data.mask});
        this.addChild(this.boxGrid);

        this.buttonMenu = new Button(this.textureSheet, "MENU", () => {
            ScreenManager.changeScreen("MainMenuScreen");
            BackgroundManager.changeColor("blue");
        });
        this.buttonMenu.position.set(512-this.buttonMenu.width, 288-this.buttonMenu.height);
        this.addChild(this.buttonMenu);

        this.interactive = true;
        this.on("pointerup", ()=>this.isSolved());
    }

    randomPuzzle(size) {
        this.boxGrid.scale.set(1,1);
        this.boxGrid.buildGridRandom(size);
        this.boxGrid.scale.y = 288/this.boxGrid.height;
        this.boxGrid.scale.x = this.boxGrid.scale.y;
        this.boxGrid.position.set((512-this.boxGrid.width)/2, 0);
    }

    fixedPuzzle(json) {
        this.boxGrid.scale.set(1,1);
        this.boxGrid.buildGrid(json);
        this.boxGrid.scale.y = 288/this.boxGrid.height;
        this.boxGrid.scale.x = this.boxGrid.scale.y;
        this.boxGrid.position.set((512-this.boxGrid.width)/2, 0);
    }

    isSolved() {
        console.log("is the puzzle solved?");
        if(this.boxGrid.isSolved()) {
            this.boxGrid.revealResult();
        }
    }

    update(delta) {
        //if(this.won) this.revealPicture();
    }
    
}
