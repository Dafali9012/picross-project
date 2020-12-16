import ScreenManager from "../utils/ScreenManager.js";

export default class MultiplayerMenu extends PIXI.Container {
    constructor(data) {
        super();
        this.textureSheet = data.textureSheet;

        this.background = new PIXI.Sprite(data.background);
        this.addChild(this.background);

        let host = new PIXI.Sprite(this.textureSheet["host"]);
        let join = new PIXI.Sprite(this.textureSheet["join"]);
        let back = new PIXI.Sprite(this.textureSheet["back"]);
        let text = new PIXI.Text("M U L T I P L A Y E R", {fontFamily: "Rockwell", fontSize: 24, fill: "white", align: "center"});
        let sound = PIXI.sound.Sound.from({
            url: "./res/sound/select.mp3",
            volume: 0.1
        });
        let soundBack = PIXI.sound.Sound.from({
            url: "./res/sound/back.mp3",
            volume: 0.1
        });
        

        host.x = (512 - host.width) / 2;
        host.y = (288 - host.height) / 3;
        join.x = (512 - join.width) / 2;
        join.y = (288 - join.height) / 2;
        back.x = (512-back.width)/2;
        back.y = (host.y*2);
        text.x = (512 - text.width) / 2;
        text.y = text.height;

        this.addChild(host);
        this.addChild(join);
        this.addChild(text);
        this.addChild(back);
        
        host.interactive = true;
        join.interactive = true;
        back.interactive = true;

        host.on("pointerdown", () => {
            host.texture = this.textureSheet["hostFocus"];
        });
        join.on("pointerdown", () => {
            join.texture = this.textureSheet["joinFocus"];
        });
        back.on("pointerdown", ()=>{
            back.texture = this.textureSheet["backFocus"];
        });

        host.on("pointerup", () => {
            host.texture = this.textureSheet["host"];
            sound.play();
        });
        join.on("pointerup", () => {
            join.texture = this.textureSheet["join"];
            sound.play();
        });
        back.on("pointerup", ()=>{
            back.texture = this.textureSheet["back"];
            soundBack.play();
            ScreenManager.previousScreen();
        });

        host.on("pointerout", () => {
            host.texture = this.textureSheet["host"];
        });
        join.on("pointerout", () => {
            join.texture = this.textureSheet["join"];
        });
        back.on("pointerout", ()=>{
            back.texture = this.textureSheet["back"];
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