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

        this.theChosenOne = new PIXI.Sprite(this.textureSheet.textures["the_not_chosen_one"]);
        this.addChild(this.theChosenOne);

        this.on("mousedown", ()=>{
            Input.leftClick=true;
            if(this.state == "filled") {
                this.state = "empty";
                this.filled = false;
                this.theChosenOne.texture = this.textureSheet.textures["the_not_chosen_one"];
                Input.delete = true;
            }
            else if(this.state == "empty") {
                this.state = "filled";
                this.filled = true;
                this.theChosenOne.texture = this.textureSheet.textures["the_chosen_one"];
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
                        this.theChosenOne.texture = this.textureSheet.textures["the_not_chosen_one"];
                    }
                }
                if(!Input.delete) {
                    if(this.state == "empty") {
                        this.theChosenOne.texture = Input.leftClick?this.textureSheet.textures["the_chosen_one"]:this.textureSheet.textures["the_not_chosen_one"];
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
            /*
            this.anchor.set(0.5);
            this.position.set(this.x + this.width/2, this.y + this.height/2);
            this.scale.set(1.02);
            */
        });
        /*
        this.on("mouseout", ()=>{
            this.scale.set(1);
            this.anchor.set(0);
            this.position.set(this.x - this.width/2, this.y - this.height/2);
        });
        */
    }

    setColor() {
        this.color = Color.getColor();
        this.tint = this.color;
    }
}