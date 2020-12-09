
export default class ScreenManager{
    constructor(container){
        this.app = new PIXI.Application({width:512, height:288, resolution:window.innerHeight/288});
        PIXI.SCALE_MODES = PIXI.SCALE_MODES.NEAREST;
        document.body.appendChild(this.app.view);

        this.app.stage.addChild(container);
    }
}