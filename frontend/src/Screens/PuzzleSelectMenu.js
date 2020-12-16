import ScreenManager from "../utils/ScreenManager.js";

export default class PuzzleSelectMenu extends PIXI.Container {
    constructor(data) {
        super();
        this.textureSheet = data.textureSheet;

        this.background = new PIXI.Sprite(data.background);
        this.addChild(this.background);

        let levelBrowser = new PIXI.Sprite(this.textureSheet.textures["button_puzzleBrowser"]);
        let random = new PIXI.Sprite(this.textureSheet.textures["button_random"]);
        let back = new PIXI.Sprite(this.textureSheet.textures["button_back"]);
        let text = new PIXI.Text("P U Z Z L E   S E L E C T",{fontFamily : 'Rockwell', fontSize: 24, fill : 'white', align: 'center'});
        let sound = PIXI.sound.Sound.from({
            url: './res/sound/select.mp3',
            volume: 0.1
        });
        let soundBack = PIXI.sound.Sound.from({
            url: "./res/sound/back.mp3",
            volume: 0.1
        });

        levelBrowser.x = (512-levelBrowser.width)/2;
        levelBrowser.y = (288-levelBrowser.height)/3;
        random.x = (512-random.width)/2;
        random.y = (288-random.height)/2;
        back.x = (512-back.width)/2;
        back.y = (levelBrowser.y*2);
        text.x = (512-text.width)/2;
        text.y = (text.height);

        this.addChild(levelBrowser);
        this.addChild(random);
        this.addChild(back);
        this.addChild(text);

        levelBrowser.interactive = true;
        random.interactive = true;
        back.interactive = true;

        levelBrowser.on("pointerdown", ()=>{
            levelBrowser.texture = this.textureSheet.textures["button_puzzleBrowser_down"];
        });
        random.on("pointerdown", ()=>{
            random.texture = this.textureSheet.textures["button_random_down"];
        });
        back.on("pointerdown", ()=>{
            back.texture = this.textureSheet.textures["button_back_down"];
        });

        levelBrowser.on("pointerup", ()=>{
            levelBrowser.texture = this.textureSheet.textures["button_puzzleBrowser"];
            sound.play();
            ScreenManager.changeScreen("gamescreen").newPuzzle({puzzleData:data.presentationPuzzle});
        });
        random.on("pointerup", ()=>{
            random.texture = this.textureSheet.textures["button_random"];
            sound.play();
            ScreenManager.changeScreen("gamesizemenu");
        });
        back.on("pointerup", ()=>{
            back.texture = this.textureSheet.textures["button_back"];
            ScreenManager.previousScreen();
            soundBack.play();
        });

        levelBrowser.on("pointerout", ()=>{
            levelBrowser.texture = this.textureSheet.textures["button_puzzleBrowser"];
        });
        random.on("pointerout", ()=>{
            random.texture = this.textureSheet.textures["button_random"];
        });
        back.on("pointerout", ()=>{
            back.texture = this.textureSheet.textures["button_back"];
        });
    }

    scrollBackground(delta) {
        this.background.x = (this.background.x+0.4*delta<0)?this.background.x+0.4*delta:-32;
        this.background.y = (this.background.y+0.2*delta<0)?this.background.y+0.2*delta:-32;
    }

    update(delta) {
        this.scrollBackground(delta);
    }
}