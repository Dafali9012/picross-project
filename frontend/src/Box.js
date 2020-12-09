export default class Box extends PIXI.Sprite {
    constructor(textures) {
        super();
        this.textures = textures;
        this.texture = this.textures["empty"];
        this.interactive = true;
        this.buttonMode = true;
        this.state = "empty";
        this.on("click", ()=>{
            if(this.state == "filled" || this.state == "crossed") {
                this.state = "empty";
                this.texture = this.textures["empty"];
            }
            else if(this.state == "empty") {
                this.state = "filled";
                this.texture = this.textures["filled"];
                console.log(this.solutionFilled);
            }
        });
        this.on("rightclick", ()=>{
            console.log(this.color, this.solutionFilled);
            if(this.state == "filled" || this.state == "crossed") {
                this.state = "empty";
                this.texture = this.textures["empty"];
            }
            else if(this.state == "empty") {
                this.state = "crossed";
                this.texture = this.textures["crossed"];
            }
        });
    }
}