import Color from "./Color.js";
import HSL2HEX from "./HSL2HEX.js";

export default class ColorPicker extends PIXI.Sprite {
    constructor(data) {
        super();
        this.textureSheet = data.textureSheet;

        this.bg = new PIXI.Sprite(this.textureSheet.textures["slider_bg"]);
        this.line = new PIXI.Sprite(this.textureSheet.textures["slider_line"]);
        this.slider = new PIXI.Sprite(this.textureSheet.textures["slider_button"]);
        this.currentColor = new PIXI.Graphics();

        this.slider.anchor.set(0.5);
        this.slider.position.set(this.slider.width/2, this.slider.height/2);

        this.baseColorBlack = new PIXI.Graphics();
        this.baseColorwhite = new PIXI.Graphics();
        this.baseColorRed = new PIXI.Graphics();
        this.baseColorBlue = new PIXI.Graphics();
        this.baseColorGreen = new PIXI.Graphics();

        this.hue = 0;
        Color.setColor(HSL2HEX.convert(this.hue,100,50));
        this.bg.tint = HSL2HEX.convert(this.hue,100,50);;

        //BASE BLACK
        this.baseColorBlack.position = this.slider.position;
        this.baseColorBlack.lineStyle(1)
        this.baseColorBlack.beginFill(0x000000, 1)
        this.baseColorBlack.drawRect(this.currentColor.position.x-5, this.currentColor.position.y-40, 10, 10);
        this.baseColorBlack.endFill();
        this.baseColorBlack.interactive = true;
        this.addChild(this.baseColorBlack);
        this.baseColorBlack.on("mousedown", ()=>{
            Color.setColor(HSL2HEX.convert(this.hue,100,0));
            this.bg.tint = HSL2HEX.convert(this.hue,100,0);;
        })
        
        //BASE WHITE
        this.baseColorwhite.position = this.slider.position;
        this.baseColorwhite.lineStyle(1)
        this.baseColorwhite.beginFill(0xffffff, 1)
        this.baseColorwhite.drawRect(this.currentColor.position.x+15, this.currentColor.position.y-40, 10, 10);
        this.baseColorwhite.endFill();
        this.baseColorwhite.interactive = true;
        this.addChild(this.baseColorwhite);
        this.baseColorwhite.on("mousedown", ()=>{
            Color.setColor(HSL2HEX.convert(this.hue,100,100));
            this.bg.tint = HSL2HEX.convert(this.hue,100,100);;
        })

        //BASE RED
        this.baseColorRed.position = this.slider.position;
        this.baseColorRed.lineStyle(1)
        this.baseColorRed.beginFill(0xff0000, 1)
        this.baseColorRed.drawRect(this.currentColor.position.x+35, this.currentColor.position.y-40, 10, 10);
        this.baseColorRed.endFill();
        this.baseColorRed.interactive = true;
        this.addChild(this.baseColorRed);
        this.baseColorRed.on("mousedown", ()=>{
            this.hue = 0;
            Color.setColor(HSL2HEX.convert(this.hue,100,50));
            this.bg.tint = HSL2HEX.convert(this.hue,100,50);;
        })

        //BASE BLUE
        this.baseColorBlue.position = this.slider.position;
        this.baseColorBlue.lineStyle(1)
        this.baseColorBlue.beginFill(0x0077ff, 1)
        this.baseColorBlue.drawRect(this.currentColor.position.x+55, this.currentColor.position.y-40, 10, 10);
        this.baseColorBlue.endFill();
        this.baseColorBlue.interactive = true;
        this.addChild(this.baseColorBlue);
        this.baseColorBlue.on("mousedown", ()=>{
            this.hue = 212;
            Color.setColor(HSL2HEX.convert(this.hue,100,50));
            this.bg.tint = HSL2HEX.convert(this.hue,100,50);;
        })

        //BASE GREEN
        this.baseColorGreen.position = this.slider.position;
        this.baseColorGreen.lineStyle(1)
        this.baseColorGreen.beginFill(0x00d100, 1)
        this.baseColorGreen.drawRect(this.currentColor.position.x+75, this.currentColor.position.y-40, 10, 10);
        this.baseColorGreen.endFill();
        this.baseColorGreen.interactive = true;
        this.addChild(this.baseColorGreen);
        this.baseColorGreen.on("mousedown", ()=>{
            this.hue = 120;
            Color.setColor(HSL2HEX.convert(this.hue,100,41));
            this.bg.tint = HSL2HEX.convert(this.hue,100,41);;
        })

        this.currentColor.lineStyle(1)
        this.currentColor.beginFill(this.bg.tint, 1)
        this.currentColor.drawRect(this.currentColor.position.x, this.currentColor.position.y+10, 50, 50);
        this.currentColor.endFill();
        this.currentColor.position.set(this.line.position.x+13,this.line.position.y+15);

        this.addChild(this.bg);
        this.addChild(this.line);
        this.addChild(this.slider);
        this.addChild(this.currentColor);

        this.slider.interactive = true;
        this.slider.buttonMode = true;

        this.slider.on("mousedown", ()=>{
            this.slider.drag = true;
        })
        document.addEventListener("mouseup", ()=>{
            this.slider.drag = false;
            this.currentColor.clear();
            this.currentColor.lineStyle(1);
            this.currentColor.beginFill(this.bg.tint, 1);
            this.currentColor.drawRect(this.currentColor.position.x, this.currentColor.position.y+10, 50, 50);
            this.currentColor.endFill();
        })
        this.slider.on("mousemove", (e)=>{
            if(this.slider.drag) {
                let newPosition = e.data.getLocalPosition(this.slider.parent);
                this.slider.position.x = newPosition.x;
                if(this.slider.x < this.slider.width/2) this.slider.x = this.slider.width/2;
                if(this.slider.x >= 96 - this.slider.width/2) this.slider.x = 96 - this.slider.width/2;

                this.hue = ((1/80)*(this.slider.x-this.slider.width/2)) * 359;
                this.bg.tint = HSL2HEX.convert(this.hue,100,50);
                Color.setColor(HSL2HEX.convert(this.hue,100,50));

            }
        });
    }
}