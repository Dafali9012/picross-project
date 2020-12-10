
import PicrossMenu from "./Screens/PicrossMenu.js";
import Input from "./utils/Input.js"

export default class Game {
    constructor() {

        this.app = new PIXI.Application({width:512, height:288, resolution:window.innerHeight/288});
        PIXI.SCALE_MODES = PIXI.SCALE_MODES.NEAREST;
        document.body.appendChild(this.app.view);
        let loader = new PIXI.Loader();
        loader.add("sheet", "./res/sheet.json").load((loader, resources)=>{
            let sheet = resources["sheet"].spritesheet;
            this.screens = {
                mainmenu:new PicrossMenu({ 
                    solo: sheet.textures["solo"],
                    soloFocus: sheet.textures["soloFocus"],
                    online: sheet.textures["online"],
                    onlineFocus: sheet.textures["onlineFocus"],
                    build: sheet.textures["build"],
                    buildFocus: sheet.textures["buildFocus"]
                })
            }
            this.app.stage.addChild(this.screens["mainmenu"]);
        });
        new Input(this.app.stage);
    }

    changeScreen(screen) {
        this.app.stage.removeChildAt(0);
        this.app.stage.addChild(this.screens[screen]);
    }
}