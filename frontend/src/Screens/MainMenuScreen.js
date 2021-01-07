import Button from "../Button.js";
import ScreenManager from "../utils/ScreenManager.js";
import BackgroundManager from "../utils/BackgroundManager.js";

export default class MainMenuScreen extends PIXI.Container {
    constructor(data) {
        super();

        this.resolution = data.resolution;
        this.textureSheet = data.textureSheet;

        this.scaleIncrease = true;
        this.angleIncrease = true;

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

        this.title = new PIXI.Sprite(data.title.textures["picross_1"]);
        this.addChild(this.title);
        this.title.pivot.set(this.title.width/2,this.title.height/2);
        this.title.scale.set(2);
        this.title.position.set((this.resolution.x)/2, (this.resolution.y/2)/2);
        
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
        if(this.scaleIncrease) {
            this.title.scale.set(this.title.scale.y+=0.0025);
            if(this.title.scale.y>=2.1) this.scaleIncrease=false;
        }
        if(!this.scaleIncrease) {
            this.title.scale.set(this.title.scale.y-=0.0025);
            if(this.title.scale.y<=2) this.scaleIncrease=true;
        }

        if(this.angleIncrease) {
            this.title.angle +=0.1;
            if(this.title.angle>=4) this.angleIncrease=false;
        }
        if(!this.angleIncrease) {
            this.title.angle -=0.1;
            if(this.title.angle<=-4) this.angleIncrease=true;
        }
    }
}
