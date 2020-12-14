import MultiplayerMenu from "../Screens/MultiplayerMenu.js";
import PicrossMenu from "../Screens/PicrossMenu.js";
import PuzzleSelectMenu from "../Screens/PuzzleSelectMenu.js";

export default class ScreenManager {
    constructor() {
        this.app = new PIXI.Application({width:512, height:288, resolution:window.innerHeight/288});
        this.app.renderer.backgroundColor = "0xfd9168";
        PIXI.SCALE_MODES = PIXI.SCALE_MODES.NEAREST;
        document.body.appendChild(this.app.view);

        this.picrossmenu = new PIXI.Container;
        this.multiplayermenu = new PIXI.Container;
        this.puzzlemenu = new PIXI.Container;
        this.gamescreen = new PIXI.Container;

        this.goToScene("picrossmenu");
        this.createScenes();

    }
    createScenes(){
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
    }

    goToScene(screen){
        if(this.app.stage.children[0]) this.app.stage.removeChildAt(0);
        this.app.stage.addChild(this.screens[screen]);
    }
}