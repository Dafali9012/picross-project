import Puzzle from "./Puzzle.js";
import PicrossMenu from "./screens/PicrossMenu.js";
import PuzzleSelectMenu from "./screens/PuzzleSelectMenu.js";
import MultiplayerMenu from "./screens/MultiplayerMenu.js";
import GameScreen from "./screens/GameScreen.js";
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
            let textureSheet = resources["texture_sheet"].spritesheet;
            Input.init(this.app.stage);
            this.screens = {
                picrossmenu:new PicrossMenu({
                    background: resources["bg_orange"].texture,
                    solo: textureSheet.textures["solo"],
                    soloFocus: textureSheet.textures["soloFocus"],
                    online: textureSheet.textures["online"],
                    onlineFocus: textureSheet.textures["onlineFocus"],
                    build: textureSheet.textures["build"],
                    buildFocus: textureSheet.textures["buildFocus"]
                }),
                multiplayermenu: new MultiplayerMenu({
                    host: textureSheet.textures["host"],
                    hostFocus: textureSheet.textures["hostFocus"],
                    join: textureSheet.textures["join"],
                    joinFocus: textureSheet.textures["joinFocus"]
                }),
                puzzlemenu: new PuzzleSelectMenu({
                    levelBrowser: textureSheet.textures["levelBrowser"],
                    levelBrowserFocus: textureSheet.textures["levelBrowserFocus"],
                    random: textureSheet.textures["random"],
                    randomFocus: textureSheet.textures["randomFocus"]
                }),
                gamescreen: new GameScreen({
                    textureSheet: textureSheet,
                    background: resources["bg_orange"].texture,
                    puzzleData: resources["testdata"].data
                })
            }

            this.changeScreen("gamescreen");

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