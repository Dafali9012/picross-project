import Button from "../Button.js";
import ScreenManager from "../utils/ScreenManager.js";
import BackgroundManager from "../utils/BackgroundManager.js";
import ColorPicker from "../utils/ColorPicker.js";

export default class MainMenuScreen extends PIXI.Container {
    constructor(data) {
        super();

        this.textureSheet = data.textureSheet;

        let text = new PIXI.Text("v0.35\n2021-01-01", {
            fontFamily:"myFont",
            fontSize:16, fill:0xFFFFFF,
            stroke:0x000000,
            strokeThickness:2.25,
            align:"right"
        });
        text.scale.set(0.3);
        this.addChild(text);
        text.position.set(512 - 16 - text.width, 288 - 16 - text.height);

        this.title = new PIXI.Sprite(data.title.textures["picross_1"]);
        this.title.position.set((512-this.title.width)/2, 32);
        this.addChild(this.title);
        
        this.buttonPlay = new Button(data.textureSheet, "PLAY", ()=>{
            ScreenManager.changeScreen("PuzzleModeScreen");
            BackgroundManager.changeColor("green");
        });
        this.buttonPlay.position.set(512/2, this.title.y + this.title.height + this.buttonPlay.height*2);
        this.addChild(this.buttonPlay);

        this.buttonBuild = new Button(data.textureSheet, "BUILD", () => {
            // goto: build puzzle screen
        });

        this.buttonBuild.position.set(512/2, this.buttonPlay.y + this.buttonBuild.height);

        this.buttonBuild.on('mousedown', function (e) {
            console.log('BUILD CLICK');
        });
        this.addChild(this.buttonBuild);

        this.colorPicker = new ColorPicker({textureSheet:this.textureSheet});
        this.colorPicker.position.set((512-96)/2, this.buttonBuild.y + this.buttonBuild.height/1.5);
        this.addChild(this.colorPicker);
    }

    update(delta) {}
}
