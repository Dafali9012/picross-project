import Input from "./utils/Input.js";

export default class Box extends PIXI.Sprite {
    constructor(data) {
        super();
        this.textureSheet = data.textureSheet;

        this.texture = this.textureSheet.textures["box_empty"];

        this.interactive = true;
        this.buttonMode = true;
        this.state = "empty";

        this.on("mousedown", ()=>{
            Input.leftClick=true;
            if(this.state == "filled" || this.state == "crossed") {
                this.state = "empty";
                this.texture = this.textureSheet.textures["box_empty"];
                Input.delete = true;
            }
            else if(this.state == "empty") {
                this.texture = this.textureSheet.textures["box_filled"];
                this.state = "filled";
                Input.delete = false;
            }
        });
        this.on("rightdown", ()=>{
            Input.leftClick=false;
            if(this.state == "filled" || this.state == "crossed") {
                this.state = "empty";
                this.texture = this.textureSheet.textures["box_empty"];
                Input.delete = true;
            }
            else if(this.state == "empty") {
                this.texture = this.textureSheet.textures["box_crossed"];
                this.state = "crossed";
                Input.delete = false;
            }
        });
        this.on("mouseover", ()=>{
            if(Input.hold){
                if(Input.delete) {
                    if(this.state != "empty") {
                        this.texture = this.textureSheet.textures["box_empty"];
                        this.state = "empty";
                    }
                }
                if(!Input.delete) {
                    if(this.state == "empty") {
                        this.texture = Input.leftClick?this.textureSheet.textures["box_filled"]:this.textureSheet.textures["box_crossed"];
                        this.state = Input.leftClick?"filled":"crossed";
                    }
                }
            }
        });
    }

    revealColor() {
        let colored = new PIXI.Sprite(PIXI.Texture.WHITE);
        colored.tint = this.color;
        colored.width = this.width;
        colored.height = this.height;
        this.addChild(colored);

        /*
        if(this.spriteComplete.tint != this.color) this.spriteComplete.tint = this.color;
        if(this.spriteComplete.alpha != 1) this.spriteComplete.alpha = Math.min(this.spriteComplete.alpha+0.02, 1);
        if(this.spriteProgress.alpha != 0) this.spriteProgress.alpha = Math.max(this.spriteProgress.alpha-0.02, 0);
        */
    }
}
