export default class Box extends PIXI.Sprite {
    constructor(textures) {
        super();
        this.textures = textures;
        this.texture = this.textures["empty"];
        this.interactive = true;
        this.buttonMode = true;
        this.state = "empty";
        this.on("click", ()=>{
            console.log(this.color, this.expectFilled);
            if(this.state == "filled") {
                this.state = "empty";
                this.texture = this.textures["empty"];
            }
            else if(this.state == "empty") {
                this.state = "filled";
                this.texture = this.textures["filled"];
            }
        });
    }
}