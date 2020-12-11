import Input from "./utils/Input.js";

export default class Box extends PIXI.Container {
    constructor(textureSheet, boxSize) {
        super();
        this.textureSheet = textureSheet;
        this.spriteProgress = new PIXI.Sprite(this.textureSheet.textures["box_empty"]);
        this.spriteProgress.width = boxSize;
        this.spriteProgress.height = boxSize;
        this.addChild(this.spriteProgress);
        this.spriteComplete = new PIXI.Sprite(PIXI.Texture.WHITE);
        this.spriteComplete.width = boxSize;
        this.spriteComplete.height = boxSize;
        this.spriteComplete.alpha = 0;
        this.addChild(this.spriteComplete);
        this.interactive = true;
        this.buttonMode = true;
        this.state = "empty";
        this.on("mousedown", ()=>{
            if(this.state == "filled" || this.state == "crossed") {
                this.state = "empty";
                this.spriteProgress.texture = this.textureSheet.textures["box_empty"];
                Input.operation = "remove";
            }
            else if(this.state == "empty") {
                this.state = "filled";
                this.spriteProgress.texture = this.textureSheet.textures["box_filled"];
                Input.operation = "fill";
            }
        });
        this.on("rightdown", ()=>{
            console.log(this.color, this.solutionFilled);
            if(this.state == "filled" || this.state == "crossed") {
                this.state = "empty";
                this.spriteProgress.texture = this.textureSheet.textures["box_empty"];
                Input.operation = "remove";
            }
            else if(this.state == "empty") {
                this.state = "crossed";
                this.spriteProgress.texture = this.textureSheet.textures["box_crossed"];
                Input.operation = "cross";
            }
        });
        this.on("mouseover", ()=>{
            if(Input.hold){
                if(Input.operation == "remove") {
                    if(this.state != "empty") {
                        this.spriteProgress.texture = this.textureSheet.textures["box_empty"];
                        this.state = "empty";
                    }
                }
                if(Input.operation == "fill") {
                    if(this.state == "empty") {
                        this.spriteProgress.texture = this.textureSheet.textures["box_filled"];
                        this.state = "filled";
                    }
                }
                if(Input.operation == "cross") {
                    if(this.state == "empty") {
                        this.spriteProgress.texture = this.textureSheet.textures["box_crossed"];
                        this.state = "crossed";
                    }
                }
            }
        });
    }

    revealColor() {
        if(this.spriteComplete.tint != this.color) this.spriteComplete.tint = this.color;
        if(this.spriteComplete.alpha != 1) this.spriteComplete.alpha = Math.min(this.spriteComplete.alpha+0.02, 1);
        if(this.spriteProgress.alpha != 0) this.spriteProgress.alpha = Math.max(this.spriteProgress.alpha-0.02, 0);
    }
}