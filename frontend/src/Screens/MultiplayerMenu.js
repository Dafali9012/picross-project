import ScreenManager from "../utils/ScreenManager.js";

export default class MultiplayerMenu extends PIXI.Container {
    constructor(textures) {
        super();
        this.textures = textures;

        this.background = new PIXI.Sprite(this.textures["background"]);
        this.addChild(this.background);

        let host = new PIXI.Sprite(textures["host"]);
        let join = new PIXI.Sprite(textures["join"]);
        let back = new PIXI.Sprite(textures["back"]);
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
            host.texture = textures["hostFocus"];
        });
        join.on("pointerdown", () => {
            join.texture = textures["joinFocus"];
        });
        back.on("pointerdown", ()=>{
            back.texture = textures["backFocus"];
        });

        host.on("pointerup", () => {
            host.texture = textures["host"];
            sound.play();
        });
        join.on("pointerup", () => {
            join.texture = textures["join"];
            sound.play();
        });
        back.on("pointerup", ()=>{
            back.texture = textures["back"];
            soundBack.play();
            ScreenManager.previousScreen();
        });

        host.on("pointerout", () => {
            host.texture = textures["host"];
        });
        join.on("pointerout", () => {
            join.texture = textures["join"];
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