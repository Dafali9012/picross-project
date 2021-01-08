import ScreenManager from "./utils/ScreenManager.js";
import BackgroundManager from "./utils/BackgroundManager.js";

export default class BrowserWindow extends PIXI.Container {
    constructor(data) {
        super();

        this.resolution = data.resolution;

        this.background = new PIXI.Sprite(PIXI.Texture.WHITE);
        this.background.width = this.resolution.x*0.6;
        this.addChild(this.background);

        for(let i = 0; i<=5; i++) {
            this.browserItem = new PIXI.Container();
            this.browserItem.interactive = true;
            this.browserItem.buttonMode = true;
            this.browserItem.background = new PIXI.Sprite(PIXI.Texture.WHITE);
            this.browserItem.background.tint = 0x00d0ff;
            this.browserItem.background.width = this.width*0.8;
            this.browserItem.background.height = 32;
            this.browserItem.json = data.presentationPuzzle;
            this.browserItem.addChild(this.browserItem.background);
            this.browserItem.position.set((this.width-this.browserItem.width)/2, this.children.length>1 ? ((this.children.length-1)*this.browserItem.height) : 0);
            this.browserItem.content = new PIXI.Container();
            this.browserItem.on('click', () => {
                BackgroundManager.changeColor("white");
                ScreenManager.changeScreen("GameScreen").fixedPuzzle(this.browserItem.json);
            });
            this.title = new PIXI.Text(this.browserItem.json.meta.title, {
                fontFamily:"Calibri",
                fontSize:18, fill:0xFFFFFF,
                stroke:0x000000,
                strokeThickness:0
            });
            this.dimensions = new PIXI.Text(this.browserItem.json.meta.dimensions + "x" + this.browserItem.json.meta.dimensions, {
                fontFamily:"Calibri",
                fontSize:18, fill:0xFFFFFF,
                stroke:0x000000,
                strokeThickness:0
            });
            this.dimensions.position.set((this.title.x+this.title.width)+this.browserItem.width/4, 0);
            this.browserItem.content.addChild(this.title);
            this.browserItem.content.addChild(this.dimensions);
            this.browserItem.content.position.set((this.browserItem.width-this.browserItem.content.width)/2,(this.browserItem.height-this.browserItem.content.height)/2)
            this.browserItem.addChild(this.browserItem.content)
            this.addChild(this.browserItem);
        }
        this.background.height = this.children.length>1 ? ((this.children.length-1)*this.browserItem.height) : 0;
    }
}