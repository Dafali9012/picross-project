import BrowserItem from "./BrowserItem.js";

export default class BrowserWindow extends PIXI.Container {
    constructor(data) {
        super();

        this.textureSheet = data.textureSheet;
        this.resolution = data.resolution;

        this.background = new PIXI.Sprite(PIXI.Texture.WHITE);
        this.background.width = this.resolution.x*0.4;
        this.background.alpha = 0.2;
        this.addChild(this.background);

        this.browserMask = new PIXI.Sprite(PIXI.Texture.WHITE);
        this.browserMask.width = this.resolution.x*0.4;
        this.addChild(this.browserMask);

        this.mask = this.browserMask;

        this.browserItems = new PIXI.Container();
        this.addChild(this.browserItems);

        this.fetchPuzzles().then((puzzles)=>{
            this.browserItems.removeChildren();
            puzzles.forEach(x=>{
                let browserItem = new BrowserItem({textureSheet:this.textureSheet, json:JSON.parse(x.json)});
                browserItem.position.set(browserItem.width/2+(this.width-browserItem.width)/2, this.browserItems.children.length*browserItem.height+browserItem.height/2);
                this.browserItems.addChild(browserItem);
            });

            if(this.browserItems.children.length >= 15) {
                let line = new PIXI.Sprite(this.textureSheet.textures["vertical_line"]);
                line.position.set(this.width-line.width+8, 0);
                line.height = this.background.height;
                this.addChild(line);
                
                this.slider = new PIXI.Sprite(this.textureSheet.textures["slider_button"]);
                this.slider.position.set(this.width-line.width+this.slider.width/2, 0);
                this.addChild(this.slider);

                this.slider.interactive = true;
                this.slider.buttonMode = true;

                this.slider.on("mousedown", ()=>{
                    this.slider.drag = true;
                });

                document.addEventListener("mouseup", ()=>{
                    this.slider.drag = false;
                });

                this.slider.on("mousemove", (e)=>{
                    if(this.slider.drag) {
                        let newPosition = e.data.getLocalPosition(this.slider.parent);
                        this.slider.position.y = newPosition.y-this.slider.height/2;
                        if(this.slider.y <= 0) this.slider.y = 0;
                        if(this.slider.y >= line.height-this.slider.height) this.slider.y = line.height-this.slider.height;
                        this.browserItems.y = (this.slider.y / (line.height-this.slider.height)) * ((this.browserItems.height - this.background.height)*-1); 
                    }
                });
            }
        });
    }

    async fetchPuzzles() {
        return await (await fetch("http://localhost:3000/api/puzzle")).json();
    }
}
