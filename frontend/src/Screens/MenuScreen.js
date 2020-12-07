export default class MenuScreen extends PIXI.Sprite {
    constructor(textures) {
        super();
        this.textures = textures;
        this.background = new PIXI.Sprite(this.textures["background"]);
        this.background.position.set(-32,-32);
        this.addChild(this.background);
    }

    scrollingBackground(delta) {
        this.background.x = (this.background.x+0.4*delta<0)?this.background.x+0.4*delta:-32;
        this.background.y = (this.background.y+0.2*delta<0)?this.background.y+0.2*delta:-32;
    }

    update(delta) {
        this.scrollingBackground(delta);
    }
}