import PicrossMenu from "./screens/PicrossMenu.js";
import PuzzleSelectMenu from "./screens/PuzzleSelectMenu.js";
import MultiplayerMenu from "./screens/MultiplayerMenu.js";
import GameScreen from "./screens/GameScreen.js";

import Input from "./utils/Input.js";
import ScreenManager from "./utils/ScreenManager.js";

export default class Game {
    constructor() {

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

            let screen = new ScreenManager;
            screen.createScenes();

            Input.init(this.app.stage);

            this.app.ticker.add(delta=>this.update(delta));
        });
    }

  update(delta) {
    this.app.stage.children[0].update(delta);
  }
}
