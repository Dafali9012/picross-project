import ScreenManager from "../utils/ScreenManager.js";

export default class PuzzleSelectMenu extends PIXI.Container {
    constructor(data) {
        super();
        
        this.textureSheet = data.textureSheet;

        this.background = new PIXI.Sprite(data.background);
        this.addChild(this.background);

        this.alpha = 0.8;
        this.levelBrowser = new PIXI.Sprite(this.textureSheet.textures["button_puzzleBrowser"]);
        this.random = new PIXI.Sprite(this.textureSheet.textures["button_random"]);
        this.back = new PIXI.Sprite(this.textureSheet.textures["button_back"]);
        this.text = new PIXI.Text("P U Z Z L E   S E L E C T",{fontFamily : 'Rockwell', fontSize: 24, fill : 'white', align: 'center'});
        this.sound = PIXI.sound.Sound.from({
            url: './res/sound/select.mp3',
            volume: 0.05
        });
        this.soundBack = PIXI.sound.Sound.from({
            url: "./res/sound/back.mp3",
            volume: 0.05
        });

        this.levelBrowser.x = (512-this.levelBrowser.width)/2;
        this.levelBrowser.y = (288-this.levelBrowser.height)/3;
        this.random.x = (512-this.random.width)/2;
        this.random.y = (288-this.random.height)/2;
        this.back.x = (512-this.back.width)/2;
        this.back.y = (this.levelBrowser.y*2);
        this.text.x = (512-this.text.width)/2;
        this.text.y = (this.text.height);

        this.addChild(this.levelBrowser);
        this.addChild(this.random);
        this.addChild(this.back);
        this.addChild(this.text);

        this.levelBrowser.interactive = true;
        this.random.interactive = true;
        this.back.interactive = true;
        this.levelBrowser.buttonMode = true;
        this.random.buttonMode = true;
        this.back.buttonMode = true;

        this.levelBrowser.on("mouseover", ()=>{
            this.levelBrowser.alpha = 1.2;
        });
        this.random.on("mouseover", ()=>{
            this.random.alpha = 1.2;
        });
        this.back.on("mouseover", ()=>{
            this.back.alpha = 1.2;
        });
        this.levelBrowser.on("pointerdown", ()=>{
            this.levelBrowser.texture = this.textureSheet.textures["button_puzzleBrowser_down"];
        });
        this.random.on("pointerdown", ()=>{
            this.random.texture = this.textureSheet.textures["button_random_down"];
        });
        this.back.on("pointerdown", ()=>{
            this.back.texture = this.textureSheet.textures["button_back_down"];
        });

        this.levelBrowser.on("pointerup", ()=>{
            this.levelBrowser.texture = this.textureSheet.textures["button_puzzleBrowser"];
            this.sound.play();
            ScreenManager.changeScreen("gamescreen").newPuzzle({puzzleData:data.presentationPuzzle});
        });
        this.random.on("pointerup", ()=>{
            this.random.texture = this.textureSheet.textures["button_random"];
            this.sound.play();
            ScreenManager.changeScreen("gamesizemenu");
        });
        this.back.on("pointerup", ()=>{
            this.back.texture = this.textureSheet.textures["button_back"];
            ScreenManager.previousScreen();
            this.soundBack.play();
        });

        this.levelBrowser.on("pointerout", ()=>{
            this.levelBrowser.texture = this.textureSheet.textures["button_puzzleBrowser"];
            this.levelBrowser.alpha = 1;
        });
        this.random.on("pointerout", ()=>{
            this.random.texture = this.textureSheet.textures["button_random"];
            this.random.alpha = 1;
        });
        this.back.on("pointerout", ()=>{
            this.back.texture = this.textureSheet.textures["button_back"];
            this.back.alpha = 1;
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