export default class MenuScreen extends PIXI.Sprite {
    constructor(textures) {
        super();
        this.textures = textures["background"];
        let red = new PIXI.Sprite(this.textures["red"]);
        red.interactive = true;
        red.x = (512-red.width)/2;
        red.y = (288-red.height)/2;
        this.addChild(red);

        red.on("pointerdown", ()=>{
            red.texture = textures["red2"];
        });
        
        red.on("pointerup", ()=>{
            red.texture = textures["red"];
        });
        
        red.on("pointerout", ()=>{
            red.texture = textures["red"];
        });
    }
}