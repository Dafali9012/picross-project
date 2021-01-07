import HSL2HEX from "./HSL2HEX.js";

export default class ColorPicker extends PIXI.Sprite {
    constructor(data) {
        super();
        this.textureSheet = data.textureSheet;

        this.bg = new PIXI.Sprite(this.textureSheet.textures["slider_bg"]);
        this.line = new PIXI.Sprite(this.textureSheet.textures["slider_line"]);
        this.slider = new PIXI.Sprite(this.textureSheet.textures["slider_button"]);

        this.slider.anchor.set(0.5);
        this.slider.position.set(this.slider.width/2, this.slider.height/2);
 
        this.hue = 0;
        this.bg.tint = HSL2HEX.convert(this.hue,100,50);

        this.addChild(this.bg);
        this.addChild(this.line);
        this.addChild(this.slider);

        this.slider.interactive = true;
        this.slider.buttonMode = true;

        this.slider.on("mousedown", ()=>{
            this.slider.drag = true;
        })
        document.addEventListener("mouseup", ()=>{
            this.slider.drag = false;
        })
        this.slider.on("mousemove", (e)=>{
            if(this.slider.drag) {
                let newPosition = e.data.getLocalPosition(this.slider.parent);
                this.slider.position.x = newPosition.x;
                if(this.slider.x < this.slider.width/2) this.slider.x = this.slider.width/2;
                if(this.slider.x >= 96 - this.slider.width/2) this.slider.x = 96 - this.slider.width/2;

                this.hue = ((1/80)*(this.slider.x-this.slider.width/2)) * 359;
                this.bg.tint = HSL2HEX.convert(this.hue,100,50);
            }
        })
    }
}
