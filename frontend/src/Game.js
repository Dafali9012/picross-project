import MainMenuScreen from "./Screens/MainMenuScreen.js";
import PuzzleModeScreen from "./Screens/PuzzleModeScreen.js";
import PuzzleSizeScreen from "./Screens/PuzzleSizeScreen.js";
import MultiplayerScreen from "./Screens/MultiplayerScreen.js";
import GameScreen from "./screens/GameScreen.js";

import Input from "./utils/Input.js";
import ScreenManager from "./utils/ScreenManager.js";


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
        .add("texture_sheet", "./res/texture_sheet_test.json")
        .add("bg_orange", "./res/bg_orange.png")
        .add("testdata", "./res/test_json/test5x.json")
        .add("title", "./res/title.json")
        .load((loader, resources)=>{
            let textureSheet = resources["texture_sheet"].spritesheet;
        
            ScreenManager.init(this.app.stage);
            ScreenManager.addScreen( 
                new GameScreen({
                    textureSheet: textureSheet,
                    background: resources["bg_orange"].texture
                })
            );
            ScreenManager.addScreen(
                new MainMenuScreen({
                    textureSheet: textureSheet,
                    background: resources["bg_orange"].texture,
                    title: resources["title"].spritesheet
                })
            );
            ScreenManager.addScreen(
                new MultiplayerScreen({
                    textureSheet: textureSheet,
                    background: resources["bg_orange"].texture,
                })
            );
            ScreenManager.addScreen(
                new PuzzleModeScreen({
                    textureSheet: textureSheet,
                    background: resources["bg_orange"].texture,
                    title: resources["title"].spritesheet,
                    presentationPuzzle: resources["testdata"].data
                })
            );
            ScreenManager.addScreen(
                new PuzzleSizeScreen({
                    textureSheet: textureSheet,
                    background: resources["bg_orange"].texture,
                    title: resources["title"].spritesheet
                })
            );

            ScreenManager.changeScreen("MainMenuScreen");
            Input.init(this.app.stage);

            this.app.ticker.add(delta=>this.update(delta));
        });
    }

  update(delta) {
    this.app.stage.children[0].update(delta);
  }
}