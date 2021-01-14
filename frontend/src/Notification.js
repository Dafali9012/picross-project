export default class Notification extends PIXI.Container {
    constructor(text) {
        super();
        this.hangTime = 30;
        this.text = new PIXI.Text(text, {
            fontFamily:"myFont",
            fontSize:32, fill:0xFFFFFF,
            stroke:0x000000,
            strokeThickness:0,
            align:"center"
        });

        this.text.scale.set(0.40);

        this.addChild(this.text);
    }

    update() {
        if(this.hangTime>0) this.hangTime--;
        if(this.alpha>0 && this.hangTime==0) {
            this.alpha-=0.015;
        }
    }
}