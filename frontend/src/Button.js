export default class Button extends PIXI.Container {
    constructor(textureSheet, text, callback) {
        super();
        this.textureSheet = textureSheet;
        this.button = new PIXI.Sprite(this.textureSheet.textures["button"]);
        this.button.anchor.set(0.5);
        this.text = new PIXI.Text(text, {
            fontFamily:"Verdana",
            fontSize:32, fill:0xFFFFFF,
            stroke:0x000000,
            strokeThickness:0,
            align:"center",
            lineJoin: "round"
        });
        this.text.anchor.set(0.5);
        this.addChild(this.button);
        this.addChild(this.text);
        this.interactive = true;
        this.buttonMode = true;
        this.text.scale.set(0.5);

        this.button.scale.set(2);

        this.on("mousedown", () => {
            this.button.scale.set(1.8);
            this.text.scale.set(0.45);
        });

        this.on("mouseup", () => {
            this.button.scale.set(2);
            this.text.scale.set(0.5);
        });

        this.on("mouseout", () => {
            this.button.scale.set(2);
            this.text.scale.set(0.5);
        });

        this.on("mouseover", () => {
            this.button.scale.set(2.10);
            this.text.scale.set(0.525);
        });

        this.on("click", () => {
            callback();
        });
    }
}
