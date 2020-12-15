import ScreenManager from "../utils/ScreenManager.js";

export default class GameSizeMenu extends PIXI.Container {
    constructor(textures) {
        super();
        this.textures = textures;

        this.background = new PIXI.Sprite(this.textures["background"]);
        this.addChild(this.background);

        let five = new PIXI.Sprite(textures["five"]);
        let ten = new PIXI.Sprite(textures["ten"]);
        let fifteen = new PIXI.Sprite(textures["fifteen"]);
        let back = new PIXI.Sprite(textures["back"]);
        let text = new PIXI.Text("B O A R D   S I Z E",{fontFamily : 'Rockwell', fontSize: 24, fill : 'white', align: 'center'});
        let sound = PIXI.sound.Sound.from({
            url: './res/sound/select.mp3'
        });
        let soundBack = PIXI.sound.Sound.from({
            url: "./res/sound/back.mp3",
        });

        five.x = (512-five.width)/2;
        five.y = (288-five.height)/3;
        ten.x = (512-ten.width)/2;
        ten.y = (288-ten.height)/2;
        fifteen.x = (512-fifteen.width)/2;
        fifteen.y = (five.y*2);
        back.x = (512-back.width)/2;
        back.y = (304-back.width);
        text.x = (512-text.width)/2;
        text.y = (text.height);

        this.addChild(five);
        this.addChild(ten);
        this.addChild(fifteen);
        this.addChild(back);
        this.addChild(text);
        
        five.interactive = true;
        ten.interactive = true;
        fifteen.interactive = true;
        back.interactive = true;
        
        five.on("pointerdown", ()=>{
            five.texture = this.textures["fiveFocus"];
        });
        ten.on("pointerdown", ()=>{
            ten.texture = this.textures["tenFocus"];
        });
        fifteen.on("pointerdown", ()=>{
            fifteen.texture = this.textures["fifteenFocus"];
        });
        back.on("pointerdown", ()=>{
            back.texture = this.textures["backFocus"];
        });

        five.on("pointerup", ()=>{
            five.texture = this.textures["five"];
            sound.play();
            ScreenManager.changeScreen("gamescreen").newPuzzle(null, 5);
        });
        ten.on("pointerup", ()=>{
            ten.texture = this.textures["ten"];
            sound.play();
            ScreenManager.changeScreen("gamescreen").newPuzzle(null, 10);
        });
        fifteen.on("pointerup", ()=>{
            fifteen.texture = this.textures["fifteen"];
            sound.play();
            ScreenManager.changeScreen("gamescreen").newPuzzle(null, 15);
        });
        back.on("pointerup", ()=>{
            back.texture = this.textures["back"];
            ScreenManager.previousScreen();
            soundBack.play();
        });

        five.on("pointerout", ()=>{
            five.texture = this.textures["five"];
        });
        ten.on("pointerout", ()=>{
            ten.texture = this.textures["ten"];
        });
        fifteen.on("pointerout", ()=>{
            fifteen.texture = this.textures["fifteen"];
        });
        back.on("pointerout", ()=>{
            back.texture = this.textures["back"];
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