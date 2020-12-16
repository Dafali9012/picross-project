import PicrossMenu from "./screens/PicrossMenu.js";
import PuzzleSelectMenu from "./screens/PuzzleSelectMenu.js";
import MultiplayerMenu from "./screens/MultiplayerMenu.js";
import GameScreen from "./screens/GameScreen.js";

import Input from "./utils/Input.js";
import ScreenManager from "./utils/ScreenManager.js";
import GameSizeMenu from "./Screens/GameSizeMenu.js";

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
        .add("testdata", "./res/test_json/test5x.json")
        .load((loader, resources)=>{
            let textureSheet = resources["texture_sheet"].spritesheet;
        
            ScreenManager.init(this.app.stage);
            ScreenManager.addScreen("gamescreen", 
                new GameScreen({
                    textureSheet: textureSheet,
                    background: resources["bg_orange"].texture
                })
            );
            ScreenManager.addScreen("picrossmenu",
                new PicrossMenu({
                    textureSheet: textureSheet,
                    background: resources["bg_orange"].texture
                })
            );
            ScreenManager.addScreen("multiplayermenu", 
                new MultiplayerMenu({
                    textureSheet: textureSheet,
                    background: resources["bg_orange"].texture,
                })
            );
            ScreenManager.addScreen("puzzlemenu", 
                new PuzzleSelectMenu({
                    textureSheet: textureSheet,
                    background: resources["bg_orange"].texture,
                    presentationPuzzle: resources["testdata"].data
                })
            );
            ScreenManager.addScreen("gamesizemenu", 
                new GameSizeMenu({
                    textureSheet: textureSheet,
                    background: resources["bg_orange"].texture
                })
            );

            ScreenManager.changeScreen("picrossmenu");
            Input.init(this.app.stage);

            this.app.ticker.add(delta=>this.update(delta));
        });
    }

  update(delta) {
    this.app.stage.children[0].update(delta);
  }
}