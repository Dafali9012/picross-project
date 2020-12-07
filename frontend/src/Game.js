import MenuScreen from "./Screens/MenuScreen.js";
import Puzzle from "./Puzzle.js";

export default class Game {
    constructor() {
        this.app = new PIXI.Application({width:512, height:288, resolution:window.innerHeight/288});
        this.app.renderer.backgroundColor = "0xfd9168";
        PIXI.SCALE_MODES = PIXI.SCALE_MODES.NEAREST;
        document.body.appendChild(this.app.view);

        let loader = new PIXI.Loader();
        loader
        .add("texture_sheet", "./res/texture_sheet.json")
        .add("menu_background", "./res/menu_bg.png")
        .add("testdata", "./res/test_json/test10x.json")
        .load((loader, resources)=>{
            let texture_sheet = resources["texture_sheet"].spritesheet;

            this.screens = {
                picross_menu:new MenuScreen({"background": resources["menu_background"].texture})
            }

            this.changeScreen("picross_menu");

            let puzzle = new Puzzle(
                resources["testdata"].data, 
                {empty: texture_sheet.textures["box_empty"],
                filled: texture_sheet.textures["box_filled"],
                crossed: texture_sheet.textures["box_crossed"]});
            puzzle.x = (512-puzzle.width)/2;
            this.app.stage.addChild(puzzle);

            this.app.ticker.add(delta=>this.update(delta));
        });
    }

    changeScreen(screen) {
        if(this.app.stage.children[0]) this.app.stage.removeChildAt(0);
        this.app.stage.addChild(this.screens[screen]);
    }

    update(delta) {
        this.app.stage.children[0].update(delta);
    }
}