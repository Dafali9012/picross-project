import Button from "./Button.js";
import BackgroundManager from "./utils/BackgroundManager.js";
import ScreenManager from "./utils/ScreenManager.js";

export default class BrowserItem extends PIXI.Container {
    constructor(data) {
        super();
        this.button = new Button(data.textureSheet.textures["long_button"], 1, "", ()=>{
            BackgroundManager.changeColor("white");
            ScreenManager.changeScreen("GameScreen").fixedPuzzle(data.json);
        });
        this.addChild(this.button);

        this.title = new PIXI.Text(data.json.meta.title, {
            fontFamily:"Calibri",
            fontSize:32, fill:0xFFFFFF,
            stroke:0x000000,
            strokeThickness:0,
            align:"left"
        });

        this.title.scale.set(0.5);
        this.title.position.set((this.width/2)*-1+32, ((this.height-this.title.height)/2)*-1);

        this.button.addChild(this.title);

        this.dimensions = new PIXI.Text(data.json.meta.dimensions + "x" + data.json.meta.dimensions, {
            fontFamily:"Calibri",
            fontSize:32, fill:0xFFFFFF,
            stroke:0x000000,
            strokeThickness:0,
            align:"right"
        });

        this.dimensions.scale.set(0.5);
        this.dimensions.position.set(this.width/2-this.dimensions.width-32, ((this.height-this.dimensions.height)/2)*-1);

        this.button.addChild(this.dimensions);
    }
}