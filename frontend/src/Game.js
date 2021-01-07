import MainMenuScreen from "./Screens/MainMenuScreen.js";
import PuzzleModeScreen from "./Screens/PuzzleModeScreen.js";
import PuzzleSizeScreen from "./Screens/PuzzleSizeScreen.js";
import MultiplayerScreen from "./Screens/MultiplayerScreen.js";
import GameScreen from "./screens/GameScreen.js";
import ColorPicker from "./utils/ColorPicker.js"



import Input from "./utils/Input.js";
import ScreenManager from "./utils/ScreenManager.js";
import BackgroundManager from "./utils/BackgroundManager.js";


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
        .add("edge", "./res/edge_dark.png")
        .add("mask", "./res/result_mask.png")
        .add("background", "./res/background.png")
        .add("testdata", "./res/test_json/test5x.json")
        .add("title", "./res/title.json")
        .load((loader, resources)=>{
            let textureSheet = resources["texture_sheet"].spritesheet;
        
            BackgroundManager.init(this.app.stage);
            this.background = new PIXI.Sprite(resources["background"].texture);
            this.app.stage.addChild(this.background);
            BackgroundManager.addColor(0x1ab1cd, "blue");
            BackgroundManager.addColor(0x9bdd1d, "green");
            BackgroundManager.addColor(0xff9e44, "orange");
            BackgroundManager.addColor(0xdddddd, "white");
            BackgroundManager.changeColor("blue");

            this.screenContainer = new PIXI.Container();
            this.app.stage.addChild(this.screenContainer);

            ScreenManager.init(this.screenContainer);

            ScreenManager.addScreen( 
                new GameScreen({
                    textureSheet: textureSheet,
                    mask: resources["mask"].texture
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
            const colorPicker = new ColorPicker(200, 150, 50, 20);
            console.log(colorPicker);
            this.app.stage.addChild(colorPicker)
            Input.init(this.app.stage);

            ScreenManager.changeScreen("MainMenuScreen");

            this.app.stage.addChild(new PIXI.Sprite(resources["edge"].texture));

            this.app.ticker.add(delta=>this.update(delta));
        });

    }

    scrollBackground(delta) {
        this.background.x = (this.background.x+0.28*delta<0)?this.background.x+0.28*delta:-32;
        this.background.y = (this.background.y+0.28*delta<0)?this.background.y+0.28*delta:-32;
    }

    update(delta) {
        this.scrollBackground(delta);
        this.screenContainer.getChildAt(0).update(delta);
    }
}
