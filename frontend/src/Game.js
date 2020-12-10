import Puzzle from "./Puzzle.js";
import PicrossMenu from "./Screens/PicrossMenu.js";
import PuzzleSelectMenu from "./Screens/PuzzleSelectMenu.js";
import MultiplayerMenu from "./Screens/MultiplayerMenu.js";
import Input from "./utils/Input.js";


export default class Game {
    constructor() {

        this.app = new PIXI.Application({width:512, height:288, resolution:window.innerHeight/288});
        this.app.renderer.backgroundColor = "0xfd9168";
        PIXI.SCALE_MODES = PIXI.SCALE_MODES.NEAREST;
        document.body.appendChild(this.app.view);

        document.addEventListener("contextmenu", e=>{
            e.preventDefault();
        });

        let loader = new PIXI.Loader();
        loader
        .add("texture_sheet", "./res/texture_sheet.json")
        .add("bg_orange", "./res/bg_orange.png")
        .add("testdata", "./res/test_json/test15x.json")
        .load((loader, resources)=>{
            let texture_sheet = resources["texture_sheet"].spritesheet;
            Input.init(this.app.stage);
            this.screens = {
                picrossmenu:new PicrossMenu({ 
                    solo: sheet.textures["solo"],
                    soloFocus: sheet.textures["soloFocus"],
                    online: sheet.textures["online"],
                    onlineFocus: sheet.textures["onlineFocus"],
                    build: sheet.textures["build"],
                    buildFocus: sheet.textures["buildFocus"]
                }),
                puzzlemenu:new PuzzleSelectMenu({
                    levelBrowser: sheet.textures["levelBrowser"],
                    levelBrowserFocus: sheet.textures["levelBrowserFocus"],
                    random: sheet.textures["random"],
                    randomFocus: sheet.textures["randomFocus"]
                }),
                multiplayermenu:new MultiplayerMenu({
                    host: sheet.textures["host"],
                    hostFocus: sheet.textures["hostFocus"],
                    join: sheet.textures["join"],
                    joinFocus: sheet.textures["joinFocus"]
                })
            }
            this.changeScreen("picrossmenu");

            // <testing>
            let puzzle = new Puzzle( 
                {empty: texture_sheet.textures["box_empty"],
                filled: texture_sheet.textures["box_filled"],
                crossed: texture_sheet.textures["box_crossed"],
                number_0: texture_sheet.textures["number_0"],
                number_1: texture_sheet.textures["number_1"],
                number_2: texture_sheet.textures["number_2"],
                number_3: texture_sheet.textures["number_3"],
                number_4: texture_sheet.textures["number_4"],
                number_5: texture_sheet.textures["number_5"],
                number_6: texture_sheet.textures["number_6"],
                number_7: texture_sheet.textures["number_7"],
                number_8: texture_sheet.textures["number_8"],
                number_9: texture_sheet.textures["number_9"]},
                resources["testdata"].data,
                this.app.stage);
            puzzle.x = (512-puzzle.width)/2;
            this.app.stage.addChild(puzzle);
            // </testing>

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