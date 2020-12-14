import ScreenManager from "../utils/ScreenManager.js";

export default class PuzzleSelectMenu extends PIXI.Container {
    constructor(textures) {
        super();
        this.textures = textures;

        this.background = new PIXI.Sprite(this.textures["background"]);
        this.addChild(this.background);

        let levelBrowser = new PIXI.Sprite(textures["levelBrowser"]);
        let random = new PIXI.Sprite(textures["random"]);
        let back = new PIXI.Sprite(textures["back"]);
        let text = new PIXI.Text("P U Z Z L E   S E L E C T",{fontFamily : 'Rockwell', fontSize: 24, fill : 'white', align: 'center'});
        let sound = PIXI.sound.Sound.from({
            url: './res/sound/select.mp3'
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
            levelBrowser.texture = textures["levelBrowserFocus"];
        });
        random.on("pointerdown", ()=>{
            random.texture = textures["randomFocus"];
        });
        back.on("pointerdown", ()=>{
            back.texture = textures["backFocus"];
        });

        levelBrowser.on("pointerup", ()=>{
            levelBrowser.texture = textures["levelBrowser"];
            sound.play();
            ScreenManager.changeScreen("gamescreen").newPuzzle(textures.presentationPuzzle);
        });
        random.on("pointerup", ()=>{
            random.texture = textures["random"];
            sound.play();
            ScreenManager.changeScreen("gamescreen").newPuzzle();
        });
        back.on("pointerup", ()=>{
            back.texture = textures["back"];
            ScreenManager.previousScreen();
            sound.play();
        });

        levelBrowser.on("pointerout", ()=>{
            levelBrowser.texture = textures["levelBrowser"];
        });
        random.on("pointerout", ()=>{
            random.texture = textures["random"];
        });
        back.on("pointerout", ()=>{
            back.texture = textures["back"];
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