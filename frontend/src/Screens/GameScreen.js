import ScreenManager from "../utils/ScreenManager.js";
import Button from "../Button.js";
import BackgroundManager from "../utils/BackgroundManager.js";
import BoxGrid from "../BoxGrid.js";

export default class GameScreen extends PIXI.Container {
    constructor(data) {
        super();

        this.resolution = data.resolution;
        this.textureSheet = data.textureSheet;

        this.isSolvedBound = this.isSolved.bind(this);

        this.boxGrid = new BoxGrid({textureSheet:this.textureSheet, mask:data.mask});
        this.addChild(this.boxGrid);

        this.title = new PIXI.Text("", {
            fontFamily:"myFont",
            fontSize:32, fill:0xFFFFFF,
            stroke:0x000000,
            strokeThickness:0,
            align:"center"
        });
        this.title.alpha = 0;
        this.addChild(this.title);

        this.buttonMenu = new Button(this.textureSheet.textures["button"], 2, "MENU", () => {
            this.title.alpha = 0;
            document.removeEventListener("pointerup", this.isSolvedBound);
            ScreenManager.changeScreen("MainMenuScreen");
            BackgroundManager.changeColor("blue");
        });
        this.buttonMenu.position.set(this.resolution.x-this.buttonMenu.width, this.resolution.y-this.buttonMenu.height);
        this.addChild(this.buttonMenu);

        this.interactive = true;
    }

    randomPuzzle(size) {
        this.title.text = "Complete!";
        this.buildPuzzle(()=>this.boxGrid.buildGridRandom(size));

        this.addResetButton(false);
    }

    fixedPuzzle(json) {
        this.title.text = json.meta.title;
        this.buildPuzzle(()=>this.boxGrid.buildGrid(json));

        this.addResetButton(true, json);
    }

    buildPuzzle(puzzleCallback) {
        this.boxGrid.scale.set(1,1);
        puzzleCallback();
        this.boxGrid.pivot.set((this.boxGrid.xOffset/2)*-1, this.boxGrid.yOffset*-1);
        this.boxGrid.scale.y = (this.resolution.y/this.boxGrid.height)*0.9;
        this.boxGrid.scale.x = this.boxGrid.scale.y;
        this.boxGrid.position.set((this.resolution.x-this.boxGrid.width)/2, (this.resolution.y-this.boxGrid.height)/2);

        this.title.position.set((this.resolution.x-this.title.width)/2, (this.boxGrid.y+this.boxGrid.yOffset*this.boxGrid.scale.y-this.title.height)/2);

        document.removeEventListener("pointerup", this.isSolvedBound);
        document.addEventListener("pointerup", this.isSolvedBound);
    }

    addResetButton(reset, json) {
        this.removeChild(this.refresh);
        this.refresh = new Button(this.textureSheet.textures["button"], 2, reset?"RESET":"RE-ROLL", () => {
            if(reset) {
                this.title.alpha = 0;
                ScreenManager.changeScreen("GameScreen").fixedPuzzle(json);
            } else {
                this.title.alpha = 0;
                ScreenManager.changeScreen("GameScreen").randomPuzzle(this.boxGrid.boxMap.length);
            }
        });
        this.refresh.position.set(this.resolution.x-this.refresh.width, this.resolution.y-2*this.refresh.height);
        this.addChild(this.refresh);
    }

    isSolved() {
        console.log("is the puzzle solved?");
        if(this.boxGrid.isSolved()) {
            this.title.alpha = 1;
            this.boxGrid.revealResult();
            document.removeEventListener("pointerup", this.isSolvedBound);
        }
    }

    update(delta) {
        //if(this.won) this.revealPicture();
    }
    
}
