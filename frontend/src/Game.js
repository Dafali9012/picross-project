import PuzzleSelectMenu from "./Screens/PuzzleSelectMenu.js";
import PicrossMenu from "./Screens/PicrossMenu.js";
import Input from "./utils/Input.js"

export default class Game {
    constructor() {
        new Input;

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
            //this.app.stage.addChild(this.screens["mainmenu"]);

            puzzlemenu:new PuzzleSelectMenu({
                    levelBrowser: sheet.textures["levelBrowser"],
                    levelBrowserFocus: sheet.textures["levelBrowserFocus"],
                    random: sheet.textures["random"],
                    randomFocus: sheet.textures["randomFocus"]
                })
        });
    }

    changeScreen(screen) {
        this.app.stage.removeChildAt(0);
        this.app.stage.addChild(this.screens[screen]);
    }
}

document.addEventListener('contextmenu', event => event.preventDefault());