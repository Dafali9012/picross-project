import MainMenuScreen from "./Screens/MainMenuScreen.js";
import PuzzleModeScreen from "./Screens/PuzzleModeScreen.js";
import PuzzleSizeScreen from "./Screens/PuzzleSizeScreen.js";
import MultiplayerScreen from "./Screens/MultiplayerScreen.js";
import GameScreen from "./screens/GameScreen.js";

import Input from "./utils/Input.js";
import ScreenManager from "./utils/ScreenManager.js";
import BackgroundManager from "./utils/BackgroundManager.js";
import LevelBrowserScreen from "./Screens/LevelBrowserScreen.js";
import LevelBuilderScreen from "./Screens/LevelBuilderScreen.js";

export default class Game {
    constructor() {
        this.resolution = {x:1280,y:720}
        this.app = new PIXI.Application({width:this.resolution.x, height:this.resolution.y, resolution:window.innerHeight/this.resolution.y});
        this.app.renderer.backgroundColor = "0xfd9168";
        PIXI.SCALE_MODES = PIXI.SCALE_MODES.NEAREST;
        document.body.appendChild(this.app.view);

        document.addEventListener("contextmenu", e=>{
            e.preventDefault();
        });

        let loader = new PIXI.Loader();
        loader
        .add("texture_sheet", "./res/texture_sheet.json")
        .add("edge", "./res/edge_dark_720.png")
        .add("mask", "./res/result_mask.png")
        .add("background", "./res/background.png")
        .add("title", "./res/title.json")
        .add("main_title", "./res/main_title.json")
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
                    mask: resources["mask"].texture,
                    resolution: this.resolution
                })
            );
            ScreenManager.addScreen(
                new MainMenuScreen({
                    textureSheet: textureSheet,
                    title: resources["main_title"].spritesheet,
                    resolution: this.resolution
                })
            );
            ScreenManager.addScreen(
                new MultiplayerScreen({
                    textureSheet: textureSheet,
                    resolution: this.resolution
                })
            );
            ScreenManager.addScreen(
                new PuzzleModeScreen({
                    textureSheet: textureSheet,
                    title: resources["title"].spritesheet,
                    resolution: this.resolution
                })
            );
            ScreenManager.addScreen(
                new PuzzleSizeScreen({
                    textureSheet: textureSheet,
                    title: resources["title"].spritesheet,
                    resolution: this.resolution
                })
            );
            ScreenManager.addScreen(
                new LevelBrowserScreen({
                    textureSheet: textureSheet,
                    title: resources["title"].spritesheet,
                    resolution: this.resolution
                })
            );
            ScreenManager.addScreen(
                new LevelBuilderScreen({
                    textureSheet: textureSheet,
                    title: resources["title"].spritesheet,
                    resolution: this.resolution
                })
            );

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
