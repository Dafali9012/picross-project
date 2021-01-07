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
            if(this.state != "solved") {
                data.highlights.show({x:this.coordinates.x, y:this.coordinates.y});
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
                this.anchor.set(0.5);
                this.position.set(this.x + this.width/2, this.y + this.height/2);
                this.scale.set(1.02);
                this.tint = 0xeeeeee;
            }
        });

        this.on("mouseout", ()=>{
            if(this.state!="solved") {
                data.highlights.hide();
                this.scale.set(1);
                this.anchor.set(0);
                this.position.set(this.x - this.width/2, this.y - this.height/2);
                this.tint = 0xffffff;
            }
        });
    }

    revealColor() {
        if(this.anchor.x == 0.5 && this.anchor.y == 0.5) {
            this.scale.set(1);
            this.anchor.set(0);
            this.position.set(this.x - this.width/2, this.y - this.height/2);
        }
        this.state = "solved";
        this.interactive = false;
        this.buttonMode = false;
        let colored = new PIXI.Sprite(PIXI.Texture.WHITE);
        colored.tint = this.color;
        colored.width = this.width;
        colored.height = this.height;
        this.addChild(colored);
    }
}
