import Button from "../Button.js";
import ScreenManager from "../utils/ScreenManager.js";
import BackgroundManager from "../utils/BackgroundManager.js";

export default class MainMenuScreen extends PIXI.Container {
    constructor(data) {
        super();

        this.resolution = data.resolution;
        this.textureSheet = data.textureSheet;

        let text = new PIXI.Text("v0.42\n2021-01-01", {
            fontFamily:"Calibri",
            fontSize:32, fill:0xFFFFFF,
            stroke:0x000000,
            strokeThickness:0,
            align:"right"
        });
        text.scale.set(0.35);
        this.addChild(text);
        text.position.set(this.resolution.x - 16 - text.width, this.resolution.y - 16 - text.height);

        this.title = new PIXI.Sprite(data.title.textures["title"]);
        this.addChild(this.title);
        this.title.scale.set(2);
        this.title.position.set((this.resolution.x-this.title.width)/2, (this.resolution.y/2)/2-this.title.height/2);

        this.gleamMask = new PIXI.Sprite(data.title.textures["title"]);
        this.addChild(this.gleamMask);
        this.gleamMask.scale.set(2);
        this.gleamMask.position.set(this.title.x, this.title.y);

        this.gleam = new PIXI.Sprite(data.title.textures["gleam"]);
        this.addChild(this.gleam);
        this.gleam.scale.set(2);
        this.gleam.position.set(this.title.x-this.gleam.width, this.title.y);
        this.gleam.mask = this.gleamMask;
        
        this.buttonPlay = new Button(data.textureSheet, "PLAY", ()=>{
            ScreenManager.changeScreen("PuzzleModeScreen");
            BackgroundManager.changeColor("green");
        });
        this.buttonPlay.position.set(this.resolution.x/2, this.resolution.y/2);
        this.addChild(this.buttonPlay);

        this.buttonBuild = new Button(data.textureSheet, "BUILD", () => {
            // goto: build puzzle screen
        });
        this.buttonBuild.position.set(this.resolution.x/2, this.buttonPlay.y + this.buttonBuild.height);
        this.addChild(this.buttonBuild);
    }

    update(delta) {
        this.gleam.x += 12.5;
        if(this.gleam.x > this.resolution.x) this.gleam.x = (this.gleam.width*-1)*4;
    }
}
