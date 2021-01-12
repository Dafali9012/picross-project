import ColorSlot from "../ColorSlot.js";
import Color from "./Color.js";
import HSL2HEX from "./HSL2HEX.js";

export default class ColorPicker extends PIXI.Sprite {
    constructor(data) {
        super();
        this.textureSheet = data.textureSheet;

        this.hue = 0;
        this.sat = 100;
        this.light = 50;

        this.selectedColor = new PIXI.Sprite(this.textureSheet.textures["box_empty"]);
        this.addChild(this.selectedColor);

        this.selectedColor.tint = HSL2HEX.convert(this.hue,this.sat,this.light);
        Color.setColor(HSL2HEX.convert(this.hue,this.sat,this.light));

        for(let i = 0; i < 3; i++) {
            let line = new PIXI.Sprite(this.textureSheet.textures["slider_line"]);
            line.position.set(0, i*line.height+this.selectedColor.height*1.5);
            this.addChild(line);
        }

        this.selectedColor.position.set((96-this.selectedColor.width)/2, 0);

        this.hueSlider = new PIXI.Sprite(this.textureSheet.textures["slider_button"]);
        this.satSlider = new PIXI.Sprite(this.textureSheet.textures["slider_button"]);
        this.lightSlider = new PIXI.Sprite(this.textureSheet.textures["slider_button"]);

        this.hueSlider.position.set(0, this.selectedColor.height*1.5);
        this.satSlider.position.set(96-this.satSlider.width, this.hueSlider.y+this.hueSlider.height);
        this.lightSlider.position.set((96-this.lightSlider.width)/2, this.satSlider.y+this.satSlider.height);

        this.addChild(this.hueSlider);
        this.addChild(this.satSlider);
        this.addChild(this.lightSlider);

        this.hueSlider.interactive = true;
        this.hueSlider.buttonMode = true;

        this.satSlider.interactive = true;
        this.satSlider.buttonMode = true;

        this.lightSlider.interactive = true;
        this.lightSlider.buttonMode = true;

        this.hueSlider.on("mousedown", ()=>{
            this.hueSlider.drag = true;
        });

        this.satSlider.on("mousedown", ()=>{
            this.satSlider.drag = true;
        });

        this.lightSlider.on("mousedown", ()=>{
            this.lightSlider.drag = true;
        });

        document.addEventListener("mouseup", ()=>{
            this.hueSlider.drag = false;
            this.satSlider.drag = false;
            this.lightSlider.drag = false;
        });

        this.hueSlider.on("mousemove", (e)=>{
            if(this.hueSlider.drag) {
                let newPosition = e.data.getLocalPosition(this.hueSlider.parent);
                this.hueSlider.position.x = newPosition.x-this.hueSlider.width/2;
                if(this.hueSlider.x <= 0) this.hueSlider.x = 0;
                if(this.hueSlider.x >= 96 - this.hueSlider.width) this.hueSlider.x = 96 - this.hueSlider.width;

                this.hue = (1/(96-this.hueSlider.width)) * (this.hueSlider.x) * 359;
                this.selectedColor.tint = HSL2HEX.convert(this.hue,this.sat,this.light);
                Color.setColor(HSL2HEX.convert(this.hue,this.sat,this.light));
            }
            if(this.satSlider.drag) {
                let newPosition = e.data.getLocalPosition(this.satSlider.parent);
                this.satSlider.position.x = newPosition.x-this.satSlider.width/2;
                if(this.satSlider.x <= 0) this.satSlider.x = 0;
                if(this.satSlider.x >= 96 - this.satSlider.width) this.satSlider.x = 96 - this.satSlider.width;

                this.sat = (1/(96-this.satSlider.width)) * (this.satSlider.x) * 100;
                this.selectedColor.tint = HSL2HEX.convert(this.hue,this.sat,this.light);
                Color.setColor(HSL2HEX.convert(this.hue,this.sat,this.light));
            }
            if(this.lightSlider.drag) {
                let newPosition = e.data.getLocalPosition(this.lightSlider.parent);
                this.lightSlider.position.x = newPosition.x-this.lightSlider.width/2;
                if(this.lightSlider.x <= 0) this.lightSlider.x = 0;
                if(this.lightSlider.x >= 96 - this.lightSlider.width) this.lightSlider.x = 96 - this.lightSlider.width;

                this.light = (1/(96-this.lightSlider.width)) * (this.lightSlider.x) * 100;
                this.selectedColor.tint = HSL2HEX.convert(this.hue,this.sat,this.light);
                Color.setColor(HSL2HEX.convert(this.hue,this.sat,this.light));
            }
        });

        this.addColor = new PIXI.Sprite(this.textureSheet.textures["add_color"]);
        this.addColor.position.set(this.selectedColor.x+this.selectedColor.width,(32-this.addColor.height)/2);
        this.addChild(this.addColor);

        this.addColor.interactive = true;
        this.addColor.buttonMode = true;

        this.addColor.on("click", ()=>{
            this.colorSlotData.reverse().push(this.selectedColor.tint);
            this.colorSlotData.reverse().pop();
            this.setColorSlotData();
        });

        this.colorSlots = new PIXI.Container();
        for(let y = 0; y < 2; y++) {
            for(let x = 0; x < 5; x++) {
                let colorSlot = new ColorSlot({textureSheet:this.textureSheet}, (hex)=>{
                    Color.setColor(hex);
                    this.selectedColor.tint = Color.getColor();
                });
                colorSlot.position.set(colorSlot.width*x, colorSlot.height*y);
                this.colorSlots.addChild(colorSlot);
            }
        }
        this.colorSlots.position.set(0, this.lightSlider.y + this.lightSlider.height + 16);
        this.colorSlots.scale.set(96/this.colorSlots.width);
        this.addChild(this.colorSlots);

        this.colorSlotData = [];
        for(let colorSlot of this.colorSlots.children) {
            this.colorSlotData.push(colorSlot.tint);
        }
    }

    setColorSlotData() {
        for(let i = 0; i < this.colorSlots.children.length; i++) {
            this.colorSlots.children[i].tint = this.colorSlotData[i];
        }
    }
}