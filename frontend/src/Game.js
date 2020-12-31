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
        .add("texture_sheet", "./res/texture_sheet.json")
        .add("background", "./res/background.png")
        .add("testdata", "./res/test_json/test5x.json")
        .add("title", "./res/title.json")
        .load((loader, resources)=>{
            let textureSheet = resources["texture_sheet"].spritesheet;
        
            ScreenManager.init(this.app.stage);
            ScreenManager.addScreen( 
                new GameScreen({
                    textureSheet: textureSheet,
                })
            );
            ScreenManager.addScreen(
                new MainMenuScreen({
                    textureSheet: textureSheet,
                    title: resources["title"].spritesheet
                })
            );
            ScreenManager.addScreen(
                new MultiplayerScreen({
                    textureSheet: textureSheet,
                })
            );
            ScreenManager.addScreen(
                new PuzzleModeScreen({
                    textureSheet: textureSheet,
                    title: resources["title"].spritesheet,
                    presentationPuzzle: resources["testdata"].data
                })
            );
            ScreenManager.addScreen(
                new PuzzleSizeScreen({
                    textureSheet: textureSheet,
                    title: resources["title"].spritesheet
                })
            );

            this.background = new PIXI.Sprite(resources["background"].texture);
            this.background.tint = Math.random() * 0xFFFFFF;
            this.app.stage.addChild(this.background);

            ScreenManager.changeScreen("MainMenuScreen");
            Input.init(this.app.stage);

            this.app.ticker.add(delta=>this.update(delta));
        });
    }

    scrollBackground(delta) {
        this.background.x = (this.background.x+0.4*delta<0)?this.background.x+0.4*delta:-32;
        this.background.y = (this.background.y+0.2*delta<0)?this.background.y+0.2*delta:-32;
    }

    update(delta) {
        this.scrollBackground(delta);
        this.app.stage.children[1].update(delta);
    }
}
