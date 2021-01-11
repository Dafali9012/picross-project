import ScreenManager from "./utils/ScreenManager.js";
import BackgroundManager from "./utils/BackgroundManager.js";

export default class BrowserWindow extends PIXI.Container {
    constructor(data) {
        super();

        this.resolution = data.resolution;

        this.background = new PIXI.Sprite(PIXI.Texture.WHITE);
        this.background.width = this.resolution.x*0.4;
        this.background.alpha = 0.2;
        this.addChild(this.background);

        this.fetchPuzzles().then((puzzles)=>{
            puzzles.forEach(x=>{
                let browserItem = new PIXI.Container();
                browserItem.interactive = true;
                browserItem.buttonMode = true;
                browserItem.background = new PIXI.Sprite(data.textureSheet.textures["button"]);
                browserItem.background.width = this.width*0.9;
                browserItem.background.height = 32;
                browserItem.json = JSON.parse(x.json);
                browserItem.addChild(browserItem.background);
                browserItem.position.set((this.width-browserItem.width)/2, this.children.length>1 ? ((this.children.length-1)*browserItem.height) : 0);
                browserItem.content = new PIXI.Container();
                browserItem.on('click', () => {
                    BackgroundManager.changeColor("white");
                    ScreenManager.changeScreen("GameScreen").fixedPuzzle(browserItem.json);
                });
                this.title = new PIXI.Text(browserItem.json.meta.title, {
                    fontFamily:"Calibri",
                    fontSize:32, fill:0xFFFFFF,
                    stroke:0x000000,
                    strokeThickness:0,
                    align:"left"
                });
                this.dimensions = new PIXI.Text(browserItem.json.meta.dimensions + "x" + browserItem.json.meta.dimensions, {
                    fontFamily:"Calibri",
                    fontSize:32, fill:0xFFFFFF,
                    stroke:0x000000,
                    strokeThickness:0,
                    align:"left"
                });
                this.dimensions.scale.set(0.5);
                this.title.scale.set(0.5);
                this.dimensions.position.set(192, 0);
                browserItem.content.addChild(this.title);
                browserItem.content.addChild(this.dimensions);
                browserItem.content.position.set(64,(browserItem.height-browserItem.content.height)/2)
                browserItem.addChild(browserItem.content)
                this.addChild(browserItem);
            });
        }); 
    }

    async fetchPuzzles() {
        return await (await fetch("http://localhost:3000/api/puzzle")).json();
    }
}
