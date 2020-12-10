import Input from "./utils/Input.js";

export default class Box extends PIXI.Sprite {
    constructor(textureSheet) {
        super();
        this.textureSheet = textureSheet;
        this.texture = this.textureSheet.textures["box_empty"];
        this.interactive = true;
        this.buttonMode = true;
        this.state = "empty";
        this.on("mousedown", ()=>{
            if(this.state == "filled" || this.state == "crossed") {
                this.state = "empty";
                this.texture = this.textureSheet.textures["box_empty"];
                Input.operation = "remove";
            }
            else if(this.state == "empty") {
                this.state = "filled";
                this.texture = this.textureSheet.textures["box_filled"];
                console.log(this.solutionFilled);
                Input.operation = "fill";
            }
        });
        this.on("rightdown", ()=>{
            console.log(this.color, this.solutionFilled);
            if(this.state == "filled" || this.state == "crossed") {
                this.state = "empty";
                this.texture = this.textureSheet.textures["box_empty"];
                Input.operation = "remove";
            }
            else if(this.state == "empty") {
                this.state = "crossed";
                this.texture = this.textureSheet.textures["box_crossed"];
                Input.operation = "cross";
            }
        });
        this.on("mouseover", ()=>{
            if(Input.hold){
                if(Input.operation == "remove") {
                    if(this.state != "empty") {
                        this.texture = this.textureSheet.textures["box_empty"];
                        this.state = "empty";
                    }
                }
                if(Input.operation == "fill") {
                    if(this.state == "empty") {
                        this.texture = this.textureSheet.textures["box_filled"];
                        this.state = "filled";
                    }
                }
                if(Input.operation == "cross") {
                    if(this.state == "empty") {
                        this.texture = this.textureSheet.textures["box_crossed"];
                        this.state = "crossed";
                    }
                }
            }
        });
    }
}