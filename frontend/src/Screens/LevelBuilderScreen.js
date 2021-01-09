import Button from "../Button.js";
import BoxGrid from "../BoxGrid.js";
import ColorPicker from "../utils/ColorPicker.js"
import ScreenManager from "../utils/ScreenManager.js";
import BackgroundManager from "../utils/BackgroundManager.js";

export default class LevelBuilderScreen extends PIXI.Container {
    constructor(data) {
        super();

        this.resolution = data.resolution;
        this.textureSheet = data.textureSheet;

        this.title = new PIXI.AnimatedSprite(data.title.animations["mode_bounce"]);
        this.title.animationSpeed = 0.04;
        this.title.play();
        this.title.scale.set(2);
        this.title.position.set((this.resolution.x-this.title.width)/2, 32);
        this.addChild(this.title);

        this.colorPicker = new ColorPicker({textureSheet:this.textureSheet});
        this.addChild(this.colorPicker);

        /*this.boxGrid = new BoxGrid({textureSheet:this.textureSheet, mask:data.mask});
        this.addChild(this.boxGrid);
        this.boxGrid.position.set((this.resolution.x-this.boxGrid.width)/2, (this.resolution.y-this.boxGrid.height)/2);*/

        this.input = new PIXI.TextInput({
            input: {
                fontSize: '20px',
                padding: '10px',
                width: '260px',
                color: '#F0F0F0'
            },
            box: {
                default: {fill: 0x01BCE7, rounded: 12, stroke: {color: 0xffffff, width: 4}},
                focused: {fill: 0x01BCE7, rounded: 8, stroke: {color: 0xffffff, width: 6}},
                disabled: {fill: 0x01BCE7, rounded: 12}
            }
        })
        this.input.placeholder = 'Enter your puzzle name ...'
	    this.input.x = 650
	    this.input.y = 650
	    this.input.pivot.x = this.input.width/2
	    this.input.pivot.y = this.input.height/2
	    this.addChild(this.input)

        this.buttonMenu = new Button(this.textureSheet, "MENU", () => {
            document.removeEventListener("pointerup", this.isSolvedBound);
            ScreenManager.changeScreen("MainMenuScreen");
            BackgroundManager.changeColor("blue");
        });
        this.publishLevel = new Button(this.textureSheet, "PUBLISH", () => {
            document.removeEventListener("pointerup", this.isSolvedBound);
        });
        this.buttonFive = new Button(this.textureSheet, "5x5", () => {
            document.removeEventListener("pointerup", this.isSolvedBound);
        });
        this.buttonTen = new Button(this.textureSheet, "10x10", () => {
            document.removeEventListener("pointerup", this.isSolvedBound);
        });
        this.buttonFifteen = new Button(this.textureSheet, "15x15", () => {
            document.removeEventListener("pointerup", this.isSolvedBound);
        });
        
        this.buttonMenu.position.set(this.resolution.x-this.buttonMenu.width, this.resolution.y-this.buttonMenu.height);
        this.publishLevel.position.set(this.resolution.x-this.publishLevel.width, this.resolution.y-2*this.publishLevel.height);
        this.buttonFive.position.set(this.resolution.x-this.publishLevel.width, this.resolution.y-9*this.publishLevel.height);
        this.buttonTen.position.set(this.resolution.x-this.publishLevel.width, this.resolution.y-8*this.publishLevel.height);
        this.buttonFifteen.position.set(this.resolution.x-this.publishLevel.width, this.resolution.y-7*this.publishLevel.height);
        this.colorPicker.position.set(this.resolution.x-this.publishLevel.width - 48, this.resolution.y-6*this.publishLevel.height);


        this.addChild(this.buttonMenu);
        this.addChild(this.publishLevel);
        this.addChild(this.buttonFive);
        this.addChild(this.buttonTen);
        this.addChild(this.buttonFifteen);

        this.interactive = true;
    }

    update(delta) {}
}
