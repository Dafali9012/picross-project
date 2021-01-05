
export default class BrowserWindow extends PIXI.Container {
    constructor() {
        super();

        this.browserBackground = new PIXI.Graphics();
        this.browserBackground.beginFill(0x00d0ff);
        this.browserBackground.drawRoundedRect (256/2, 50, 256, 100, 5);
        this.browserBackground.endFill();

        this.browserBorder = new PIXI.Graphics();
        this.browserBorder.beginFill(0xFFFFFF);
        this.browserBorder.drawRoundedRect (252/2, 48, 260, 104, 5);
        this.browserBorder.endFill();

        this.addChild(this.browserBorder)
        this.addChild(this.browserBackground)
        
    }
}