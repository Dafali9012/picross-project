import ScreenManager from "../utils/ScreenManager.js";

export default class MultiplayerScreen extends PIXI.Container {
    constructor(data) {
        super();
        
        this.textureSheet = data.textureSheet;

        this.host = new PIXI.Sprite(this.textureSheet.textures["button_host"]);
        this.join = new PIXI.Sprite(this.textureSheet.textures["button_join"]);
        this.back = new PIXI.Sprite(this.textureSheet.textures["button_back"]);
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
            this.host.texture = this.textureSheet.textures["button_host_down"];
        });
        this.join.on("pointerdown", () => {
            this.join.texture = this.textureSheet.textures["button_join_down"];
        });
        this.back.on("pointerdown", ()=>{
            this.back.texture = this.textureSheet.textures["button_back_down"];
        });

        this.host.on("pointerup", () => {
            this.host.texture = this.textureSheet.textures["button_host"];
            this.sound.play();
        });
        this.join.on("pointerup", () => {
            this.join.texture = this.textureSheet.textures["button_join"];
            this.sound.play();
        });
        this.back.on("pointerup", ()=>{
            this.back.texture = this.textureSheet.textures["button_back"];
            this.soundBack.play();
            ScreenManager.previousScreen();
        });

        this.host.on("pointerout", () => {
            this.host.texture = this.textureSheet.textures["button_host"];
            this.host.alpha = 1;
        });
        this.join.on("pointerout", () => {
            this.join.texture = this.textureSheet.textures["button_join"];
            this.join.alpha = 1;
        });
        this.back.on("pointerout", ()=>{
            this.back.texture = this.textureSheet.textures["button_back"];
            this.back.alpha = 1;
        });
    }

    update(delta) {}
}
