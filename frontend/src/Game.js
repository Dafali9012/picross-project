import MenuScreen from "./Screens/MenuScreen.js";
import Input from "./utils/Input.js"

export default class Game {
    constructor() {

        this.app = new PIXI.Application({width:512, height:288, resolution:window.innerHeight/288});
        PIXI.SCALE_MODES = PIXI.SCALE_MODES.NEAREST;
        document.body.appendChild(this.app.view);
        let loader = new PIXI.Loader();
        loader.add("sheet", "./res/sheet.json").load((loader, resources)=>{
            let sheet = resources["sheet"].spritesheet;
            this.screens = {mainmenu:new MenuScreen({background: sheet.textures["background"], red: sheet.textures["red"], red2: sheet.textures["red2"]})}
            this.app.stage.addChild(this.screens["mainmenu"]);
        });
        new Input(this.app.stage);
    }

    changeScreen(screen) {
        this.app.stage.removeChildAt(0);
        this.app.stage.addChild(this.screens[screen]);
    }
}