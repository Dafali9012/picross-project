import Input from "./utils/Input.js";
import Color from "./utils/Color.js";

export default class BuildBox extends PIXI.Sprite {
    constructor(data) {
        super();
        this.textureSheet = data.textureSheet;

        this.texture = this.textureSheet.textures["box_empty"];

        this.interactive = true;
        this.buttonMode = true;
        this.state = "empty";

        this.filled = false;
        this.color = 0xFFFFFF;

        this.theChosenOne = new PIXI.Sprite(PIXI.Texture.EMPTY);
        this.addChild(this.theChosenOne);

        this.on("mousedown", ()=>{
            Input.leftClick=true;
            if(this.state == "filled") {
                this.state = "empty";
                this.filled = false;
                this.theChosenOne.texture = PIXI.Texture.EMPTY;
                Input.delete = true;
            }
            else if(this.state == "empty") {
                this.state = "filled";
                this.filled = true;
                this.theChosenOne.texture = this.textureSheet.textures["build_filled"];
                Input.delete = false;
            }
        });

        this.on("rightdown", ()=>{
            Input.leftClick=false;
            this.setColor();
        });

        this.on("mouseover", ()=>{
            if(Input.hold){
                if(Input.delete) {
                    if(this.state != "empty") {
                        this.state = "empty";
                        this.filled = false;
                        this.theChosenOne.texture = PIXI.Texture.EMPTY;
                    }
                }
                if(!Input.delete) {
                    if(this.state == "empty") {
                        this.theChosenOne.texture = Input.leftClick?this.textureSheet.textures["build_filled"]:PIXI.Texture.EMPTY;
                        if(Input.leftClick) {
                            this.state = "filled";
                            this.filled = true;
                        }
                        else { this.setColor(); }
                    }
                }
                if(!Input.leftClick) {
                    this.setColor();
                }
            }
        });
    }

    setColor() {
        this.color = Color.getColor();
        this.tint = this.color;
    }
}