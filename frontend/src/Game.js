import Puzzle from "./Puzzle.js";
import PicrossMenu from "./Screens/PicrossMenu.js";
import PuzzleSelectMenu from "./Screens/PuzzleSelectMenu.js";
import MultiplayerMenu from "./Screens/MultiplayerMenu.js";


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

            this.screens = {
                picrossmenu:new PicrossMenu({
                    background: resources["bg_orange"].texture,
                    solo: texture_sheet.textures["solo"],
                    soloFocus: texture_sheet.textures["soloFocus"],
                    online: texture_sheet.textures["online"],
                    onlineFocus: texture_sheet.textures["onlineFocus"],
                    build: texture_sheet.textures["build"],
                    buildFocus: texture_sheet.textures["buildFocus"]
                }),
                multiplayermenu: new MultiplayerMenu({
                    host: texture_sheet.textures["host"],
                    hostFocus: texture_sheet.textures["hostFocus"],
                    join: texture_sheet.textures["join"],
                    joinFocus: texture_sheet.textures["joinFocus"]
                }),
                puzzlemenu: new PuzzleSelectMenu({
                    levelBrowser: texture_sheet.textures["levelBrowser"],
                    levelBrowserFocus: texture_sheet.textures["levelBrowserFocus"],
                    random: texture_sheet.textures["random"],
                    randomFocus: texture_sheet.textures["randomFocus"]
                })
            }

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