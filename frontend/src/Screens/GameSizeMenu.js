import ScreenManager from "../utils/ScreenManager.js";

export default class GameSizeMenu extends PIXI.Container {
    constructor(data) {
        super();

        this.textureSheet = data.textureSheet;

        this.background = new PIXI.Sprite(data.background);
        this.addChild(this.background);

        let five = new PIXI.Sprite(this.textureSheet.textures["button_sizeFive"]);
        let ten = new PIXI.Sprite(this.textureSheet.textures["button_sizeTen"]);
        let fifteen = new PIXI.Sprite(this.textureSheet.textures["button_sizeFifteen"]);
        let back = new PIXI.Sprite(this.textureSheet.textures["button_back"]);
        let text = new PIXI.Text("B O A R D   S I Z E",{fontFamily : 'Calibri', fontSize: 24, fill : 'white', align: 'center'});
        let sound = PIXI.sound.Sound.from({
            url: './res/sound/select.mp3',
            volume: 0.1
        });
        let soundBack = PIXI.sound.Sound.from({
            url: "./res/sound/back.mp3",
            volume: 0.1
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
            five.texture = this.textureSheet.textures["button_sizeFive_down"];
        });
        ten.on("pointerdown", ()=>{
            ten.texture = this.textureSheet.textures["button_sizeTen_down"];
        });
        fifteen.on("pointerdown", ()=>{
            fifteen.texture = this.textureSheet.textures["button_sizeFifteen_down"];
        });
        back.on("pointerdown", ()=>{
            back.texture = this.textureSheet.textures["button_back_down"];
        });

        five.on("pointerup", ()=>{
            five.texture = this.textureSheet.textures["button_sizeFive"];
            sound.play();
            ScreenManager.changeScreen("gamescreen").newPuzzle();
        });
        ten.on("pointerup", ()=>{
            ten.texture = this.textureSheet.textures["button_sizeTen"];
            sound.play();
            ScreenManager.changeScreen("gamescreen").newPuzzle({puzzleSize:10});
        });
        fifteen.on("pointerup", ()=>{
            fifteen.texture = this.textureSheet.textures["button_sizeFifteen"];
            sound.play();
            ScreenManager.changeScreen("gamescreen").newPuzzle({puzzleSize:15});
        });
        back.on("pointerup", ()=>{
            back.texture = this.textureSheet.textures["button_back"];
            ScreenManager.previousScreen();
            soundBack.play();
        });

        five.on("pointerout", ()=>{
            five.texture = this.textureSheet.textures["button_sizeFive"];
        });
        ten.on("pointerout", ()=>{
            ten.texture = this.textureSheet.textures["button_sizeTen"];
        });
        fifteen.on("pointerout", ()=>{
            fifteen.texture = this.textureSheet.textures["button_sizeFifteen"];
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