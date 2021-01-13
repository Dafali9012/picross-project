export default class Button extends PIXI.Sprite {
    constructor(texture, scale, text, callback) {
        super();
        this.texture = texture;

        this.interactive = true;
        this.buttonMode = true;
        
        this.anchor.set(0.5);
        
        this.text = new PIXI.Text(text, {
            fontFamily:"Verdana",
            fontSize:32, fill:0xFFFFFF,
            stroke:0x000000,
            strokeThickness:0,
            align:"center",
            lineJoin: "round"
        });

        this.text.anchor.set(0.5);
        this.addChild(this.text);
        this.text.scale.set(0.25);

        this.scale.set(scale);

        this.on("mousedown", () => {
            this.scale.set(scale*0.9);
        });

        this.on("mouseup", () => {
            this.scale.set(scale);
        });

        this.on("mouseout", () => {
            this.scale.set(scale);
        });

        this.on("mouseover", () => {
            this.scale.set(scale*1.05);
        });

        this.on("click", () => {
            callback();
        });
    }
}
