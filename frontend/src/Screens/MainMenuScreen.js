import Button from "../Button.js";
import ScreenManager from "../utils/ScreenManager.js";
import BackgroundManager from "../utils/BackgroundManager.js";
//import ColorPicker from "../utils/ColorPicker.js";

export default class MainMenuScreen extends PIXI.Container {
    constructor(data) {
        super();

        this.resolution = data.resolution;
        this.textureSheet = data.textureSheet;

        let text = new PIXI.Text("v0.42\n2021-01-01", {
            fontFamily:"Calibri",
            fontSize:8, fill:0xFFFFFF,
            stroke:0x000000,
            strokeThickness:0,
            align:"right"
        });
        this.addChild(text);
        text.position.set(this.resolution.x - 16 - text.width, this.resolution.y - 16 - text.height);

        this.title = new PIXI.Sprite(data.title.textures["picross_1"]);
        this.title.position.set((this.resolution.x-this.title.width)/2, 32);
        this.addChild(this.title);
        
        this.buttonPlay = new Button(data.textureSheet, "PLAY", ()=>{
            ScreenManager.changeScreen("PuzzleModeScreen");
            BackgroundManager.changeColor("green");
        });
        this.buttonPlay.position.set(this.resolution.x/2, this.title.y + this.title.height + this.buttonPlay.height*2);
        this.addChild(this.buttonPlay);

        this.buttonBuild = new Button(data.textureSheet, "BUILD", () => {
            // goto: build puzzle screen
        });
        this.buttonBuild.position.set(this.resolution.x/2, this.buttonPlay.y + this.buttonBuild.height);
        this.addChild(this.buttonBuild);

        /*
        this.colorPicker = new ColorPicker({textureSheet:this.textureSheet});
        this.colorPicker.position.set((512-96)/2, this.buttonBuild.y + this.buttonBuild.height/1.5);
        this.addChild(this.colorPicker);
        */
    }

    update(delta) {}
}
