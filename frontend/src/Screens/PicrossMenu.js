import ScreenManager from "../utils/ScreenManager.js";

export default class PicrossMenu extends PIXI.Container {
    constructor(data) {
        super();
        this.textureSheet = data.textureSheet;

        this.background = new PIXI.Sprite(data.background);
        this.addChild(this.background);

        let solo = new PIXI.Sprite(this.textureSheet.textures["button_solo"]);
        let online = new PIXI.Sprite(this.textureSheet.textures["button_online"]);
        let build = new PIXI.Sprite(this.textureSheet.textures["button_build"]);
        let text = new PIXI.Text("P I C R O S S",{fontFamily : 'Rockwell', fontSize: 24, fill : 'white', align: 'center'});
        let sound = PIXI.sound.Sound.from({
            url: './res/sound/select.mp3',
            volume: 0.1
        });

        solo.x = (512-solo.width)/2;
        solo.y = (288-solo.height)/3;
        online.x = (512-online.width)/2;
        online.y = (288-online.height)/2;
        build.x = (512-build.width)/2;
        build.y = (solo.y*2);
        text.x = (512-text.width)/2;
        text.y = (text.height);

        this.addChild(solo);
        //this.addChild(build);
        //this.addChild(online);
        this.addChild(text);
        
        solo.interactive = true;
        build.interactive = true;
        online.interactive = true;
        
        solo.on("pointerdown", ()=>{
            solo.texture = this.textureSheet.textures["button_solo_down"];
        });
        online.on("pointerdown", ()=>{
            online.texture = this.textureSheet.textures["button_online_down"];
        });
        build.on("pointerdown", ()=>{
            build.texture = this.textureSheet.textures["button_build_down"];
        });

        solo.on("pointerup", ()=>{
            solo.texture = this.textureSheet.textures["button_solo"];
            sound.play();
            ScreenManager.changeScreen("puzzlemenu");
        });
        online.on("pointerup", ()=>{
            online.texture = this.textureSheet.textures["button_online"];
            sound.play();
            ScreenManager.changeScreen("multiplayermenu");
        });
        build.on("pointerup", ()=>{
            build.texture = this.textureSheet.textures["button_build"];
            sound.play();
        });

        solo.on("pointerout", ()=>{
            solo.texture = this.textureSheet.textures["button_solo"];
        });
        online.on("pointerout", ()=>{
            online.texture = this.textureSheet.textures["button_online"];
        });
        build.on("pointerout", ()=>{
            build.texture = this.textureSheet.textures["button_build"];
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