import Button from "../Button.js";
import ScreenManager from "../utils/ScreenManager.js";
import BackgroundManager from "../utils/BackgroundManager.js";

export default class MainMenuScreen extends PIXI.Container {
    constructor(data) {
        super();

        this.textureSheet = data.textureSheet;

        let text = new PIXI.Text("v0.2\n2021-01-01", {
            fontFamily:"myFont",
            fontSize:4, fill:0xFFFFFF,
            stroke:0x000000,
            strokeThickness:1,
            align:"right"
        });
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
        this.addChild(this.buttonBuild);
    }

    update(delta) {}
}
