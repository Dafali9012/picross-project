import Input from "./utils/Input.js";

export default class Box extends PIXI.Sprite {
    constructor(textures) {
        super();
        this.textures = textures;
        this.texture = this.textures["empty"];
        this.interactive = true;
        this.buttonMode = true;
        this.state = "empty";
        this.on("mousedown", ()=>{
            if(this.state == "filled" || this.state == "crossed") {
                this.state = "empty";
                this.texture = this.textures["empty"];
                Input.operation = "remove";
            }
            else if(this.state == "empty") {
                this.state = "filled";
                this.texture = this.textures["filled"];
                console.log(this.solutionFilled);
                Input.operation = "fill";
            }
        });
        this.on("rightdown", ()=>{
            console.log(this.color, this.solutionFilled);
            if(this.state == "filled" || this.state == "crossed") {
                this.state = "empty";
                this.texture = this.textures["empty"];
                Input.operation = "remove";
            }
            else if(this.state == "empty") {
                this.state = "crossed";
                this.texture = this.textures["crossed"];
                Input.operation = "cross";
            }
        });
        this.on("mouseover", ()=>{
            if(Input.hold){
                if(Input.operation == "remove") {
                    if(this.state != "empty") {
                        this.texture = this.textures["empty"];
                        this.state = "empty";
                    }
                }
                if(Input.operation == "fill") {
                    if(this.state == "empty") {
                        this.texture = this.textures["filled"];
                        this.state = "filled";
                    }
                }
                if(Input.operation == "cross") {
                    if(this.state == "empty") {
                        this.texture = this.textures["crossed"];
                        this.state = "crossed";
                    }
                }
            }
        });
    }
}