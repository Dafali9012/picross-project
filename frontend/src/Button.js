export default class Button extends PIXI.Sprite {
    constructor(textureSheet, text, callback) {
        super();
        this.textureSheet = textureSheet;
        this.texture = this.textureSheet.textures["button"];
        this.anchor.set(0.5);
        this.text = new PIXI.Text(text, {
            fontFamily:"myFont",
            fontSize:16, fill:0xFFFFFF,
            stroke:0x000000,
            strokeThickness:2.25,
            align:"center"
        });
        this.text.scale.set(0.3);
        this.text.anchor.set(0.5);
        this.addChild(this.text);
        this.interactive = true;
        this.buttonMode = true;

        this.on("mousedown", () => {
            this.scale.set(0.9);
        });

        this.on("mouseup", () => {
            this.scale.set(1);
        });

        this.on("mouseout", () => {
            this.scale.set(1);
        });

        this.on("mouseover", () => {
            this.scale.set(1.05);
        });

        this.on("click", () => {
            callback();
        });
    }
}
