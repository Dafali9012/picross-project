import ScreenManager from "../utils/ScreenManager.js";

export default class MultiplayerMenu extends PIXI.Container {
    constructor(textures) {
        super();
        this.textures = textures;

        this.background = new PIXI.Sprite(this.textures["background"]);
        this.addChild(this.background);

        this.host = new PIXI.Sprite(textures["host"]);
        this.join = new PIXI.Sprite(textures["join"]);
        this.back = new PIXI.Sprite(textures["back"]);
        this.text = new PIXI.Text("M U L T I P L A Y E R", {fontFamily: "Rockwell", fontSize: 24, fill: "white", align: "center"});
        this.sound = PIXI.sound.Sound.from({
            url: "./res/sound/select.mp3",
            volume: 0.05
        });
        this.soundBack = PIXI.sound.Sound.from({
            url: "./res/sound/back.mp3",
            volume: 0.05
        });
        

        this.host.x = (512 - this.host.width) / 2;
        this.host.y = (288 - this.host.height) / 3;
        this.join.x = (512 - this.join.width) / 2;
        this.join.y = (288 - this.join.height) / 2;
        this.back.x = (512-this.back.width)/2;
        this.back.y = (this.host.y*2);
        this.text.x = (512 - this.text.width) / 2;
        this.text.y = this.text.height;

        this.addChild(this.host);
        this.addChild(this.join);
        this.addChild(this.text);
        this.addChild(this.back);
        
        this.host.interactive = true;
        this.join.interactive = true;
        this.back.interactive = true;
        this.host.buttonMode = true;
        this.join.buttonMode = true;
        this.back.buttonMode = true;

        this.host.on("mouseover", ()=>{
            this.host.alpha = 1.2;
        });
        this.join.on("mouseover", ()=>{
            this.join.alpha = 1.2;
        });
        this.back.on("mouseover", ()=>{
            this.back.alpha = 1.2;
        });

        this.host.on("pointerdown", () => {
            this.host.texture = textures["hostFocus"];
        });
        this.join.on("pointerdown", () => {
            this.join.texture = textures["joinFocus"];
        });
        this.back.on("pointerdown", ()=>{
            this.back.texture = textures["backFocus"];
        });

        this.host.on("pointerup", () => {
            this.host.texture = textures["host"];
            this.sound.play();
        });
        this.join.on("pointerup", () => {
            this.join.texture = textures["join"];
            this.sound.play();
        });
        this.back.on("pointerup", ()=>{
            this.back.texture = textures["back"];
            this.soundBack.play();
            ScreenManager.previousScreen();
        });

        this.host.on("pointerout", () => {
            this.host.texture = textures["host"];
            this.host.alpha = 1;
        });
        this.join.on("pointerout", () => {
            this.join.texture = textures["join"];
            this.join.alpha = 1;
        });
        this.back.on("pointerout", ()=>{
            this.back.texture = textures["back"];
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