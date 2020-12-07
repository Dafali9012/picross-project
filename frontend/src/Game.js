import MenuScreen from "./Screens/MenuScreen.js";
import Puzzle from "./Puzzle.js";

export default class Game {
    constructor() {
        this.app = new PIXI.Application({width:512, height:288, resolution:window.innerHeight/288});
        this.app.renderer.backgroundColor = 0x4682b4;
        PIXI.SCALE_MODES = PIXI.SCALE_MODES.NEAREST;
        document.body.appendChild(this.app.view);

        let loader = new PIXI.Loader();
        loader
        .add("sheet", "./res/sheet.json")
        .add("testdata", "./res/test_json/test5x.json")
        .load((loader, resources)=>{
            let sheet = resources["sheet"].spritesheet;

            this.screens = {
                mainmenu:new MenuScreen({background: sheet.textures["background"], red: sheet.textures["red"], red2: sheet.textures["red2"]})
            }

            this.changeScreen("mainmenu");

            let puzzle = new Puzzle(resources["testdata"].data, {empty: sheet.textures["box_empty"], filled: sheet.textures["box_filled"]});
            puzzle.x = (512-puzzle.width)/2;
            this.app.stage.addChild(puzzle);
        });
    }

    changeScreen(screen) {
        if(this.app.stage.children[0]) this.app.stage.removeChildAt(0);
        this.app.stage.addChild(this.screens[screen]);
    }
}