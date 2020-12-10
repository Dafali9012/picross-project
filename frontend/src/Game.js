import PuzzleSelectMenu from "./Screens/PuzzleSelectMenu.js";
import PicrossMenu from "./Screens/PicrossMenu.js";
import Input from "./utils/Input.js"
import MultiplayerMenu from "./Screens/MultiplayerMenu.js";

export default class Game {
    constructor() {
        new Input;
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

            let puzzlemenu = new PuzzleSelectMenu({
                levelBrowser: sheet.textures["levelBrowser"],
                levelBrowserFocus: sheet.textures["levelBrowserFocus"],
                random: sheet.textures["random"],
                randomFocus: sheet.textures["randomFocus"]
            })
            let multiplayermenu = new MultiplayerMenu({
                host: sheet.textures["host"],
                hostFocus: sheet.textures["hostFocus"],
                join: sheet.textures["join"],
                joinFocus: sheet.textures["joinFocus"]
            })
        });
    }

    changeScreen(screen) {
        this.app.stage.removeChildAt(0);
        this.app.stage.addChild(this.screens[screen]);
    }
}

document.addEventListener('contextmenu', event => event.preventDefault());