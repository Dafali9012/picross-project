import ScreenManager from "../utils/ScreenManager.js";

export default class PuzzleSizeScreen extends PIXI.Container {
    constructor(data) {
        super();

        this.textureSheet = data.textureSheet;

        this.background = new PIXI.Sprite(data.background);
        this.addChild(this.background);

        this.alpha = 0.8;
        this.five = new PIXI.Sprite(this.textureSheet.textures["button_sizeFive"]);
        this.ten = new PIXI.Sprite(this.textureSheet.textures["button_sizeTen"]);
        this.fifteen = new PIXI.Sprite(this.textureSheet.textures["button_sizeFifteen"]);
        this.back = new PIXI.Sprite(this.textureSheet.textures["button_back"]);
        this.text = new PIXI.Text("B O A R D   S I Z E",{fontFamily : 'Rockwell', fontSize: 24, fill : 'white', align: 'center'});
        this.sound = PIXI.sound.Sound.from({
            url: './res/sound/select.mp3',
            volume: 0.05
        });
        this.soundBack = PIXI.sound.Sound.from({
            url: "./res/sound/back.mp3",
            volume: 0.05
        });

        this.five.x = (512-this.five.width)/2;
        this.five.y = (288-this.five.height)/3;
        this.ten.x = (512-this.ten.width)/2;
        this.ten.y = (288-this.ten.height)/2;
        this.fifteen.x = (512-this.fifteen.width)/2;
        this.fifteen.y = (this.five.y*2);
        this.back.x = (512-this.back.width)/2;
        this.back.y = (304-this.back.width);
        this.text.x = (512-this.text.width)/2;
        this.text.y = (this.text.height);

        this.addChild(this.five);
        this.addChild(this.ten);
        this.addChild(this.fifteen);
        this.addChild(this.back);
        this.addChild(this.text);
        
        this.five.interactive = true;
        this.ten.interactive = true;
        this.fifteen.interactive = true;
        this.back.interactive = true;
        this.five.buttonMode = true;
        this.ten.buttonMode = true;
        this.fifteen.buttonMode = true;
        this.back.buttonMode = true;
        
        this.five.on("mouseover", ()=>{
            this.five.alpha = 1.2;
        });
        this.ten.on("mouseover", ()=>{
            this.ten.alpha = 1.2;
        });
        this.fifteen.on("mouseover", ()=>{
            this.fifteen.alpha = 1.2;
        });
        this.back.on("mouseover", ()=>{
            this.back.alpha = 1.2;
        });

        this.five.on("pointerdown", ()=>{
            this.five.texture = this.textureSheet.textures["button_sizeFive_down"];
        });
        this.ten.on("pointerdown", ()=>{
            this.ten.texture = this.textureSheet.textures["button_sizeTen_down"];
        });
        this.fifteen.on("pointerdown", ()=>{
            this.fifteen.texture = this.textureSheet.textures["button_sizeFifteen_down"];
        });
        this.back.on("pointerdown", ()=>{
            this.back.texture = this.textureSheet.textures["button_back_down"];
        });

        this.five.on("pointerup", ()=>{
            this.five.texture = this.textureSheet.textures["button_sizeFive"];
            this.sound.play();
            ScreenManager.changeScreen("gamescreen").newPuzzle({puzzleSize: 5});
        });
        this.ten.on("pointerup", ()=>{
            this.ten.texture = this.textureSheet.textures["button_sizeTen"];
            this.sound.play();
            ScreenManager.changeScreen("gamescreen").newPuzzle({puzzleSize: 10});
        });
        this.fifteen.on("pointerup", ()=>{
            this.fifteen.texture = this.textureSheet.textures["button_sizeFifteen"];
            this.sound.play();
            ScreenManager.changeScreen("gamescreen").newPuzzle({puzzleSize: 15});
        });
        this.back.on("pointerup", ()=>{
            this.back.texture = this.textureSheet.textures["button_back"];
            ScreenManager.previousScreen();
            this.soundBack.play();
        });

        this.five.on("pointerout", ()=>{
            this.five.texture = this.textureSheet.textures["button_sizeFive"];
            this.five.alpha = 1;
        });
        this.ten.on("pointerout", ()=>{
            this.ten.texture = this.textureSheet.textures["button_sizeTen"];
            this.ten.alpha = 1;
        });
        this.fifteen.on("pointerout", ()=>{
            this.fifteen.texture = this.textureSheet.textures["button_sizeFifteen"];
            this.fifteen.alpha = 1;
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