export default class ColorSlot extends PIXI.Sprite {
    constructor(data, setColorCallback) {
        super();
        this.textureSheet = data.textureSheet;
        this.texture = this.textureSheet.textures["box_empty"];
        this.tint = 0xFFFFFF;
        this.buttonMode = true;
        this.interactive = true;

        this.on("click", ()=>setColorCallback(this.tint));
    }
}