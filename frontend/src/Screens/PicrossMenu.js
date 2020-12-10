export default class PicrossMenu extends PIXI.Container {
    constructor(textures) {
        super();
        this.textures = textures;

        this.background = new PIXI.Sprite(this.textures["background"]);
        this.addChild(this.background);

        let solo = new PIXI.Sprite(textures["solo"]);
        solo.x = (512-solo.width)/2;
        solo.y = (288-solo.height)/3;

        this.addChild(solo);
        solo.interactive = true;
        solo.on("pointerdown", ()=>{
            solo.texture = this.textures["soloFocus"];
            sound.play();
        });
        solo.on("pointerup", ()=>{
            solo.texture = textures["solo"];
        });
        solo.on("pointerout", ()=>{
            solo.texture = textures["solo"];
        });

        let online = new PIXI.Sprite(textures["online"]);
        online.x = (512-online.width)/2;
        online.y = (288-online.height)/2;

        this.addChild(online);
        online.interactive = true;
        online.on("pointerdown", ()=>{
            online.texture = this.textures["onlineFocus"];
            sound.play();
        });
        online.on("pointerup", ()=>{
            online.texture = textures["online"];
        });
        online.on("pointerout", ()=>{
            online.texture = textures["online"];
        });

        let build = new PIXI.Sprite(textures["build"]);
        build.x = (512-build.width)/2;
        build.y = (solo.y*2);

        this.addChild(build);
        build.interactive = true;
        build.on("pointerdown", ()=>{
            build.texture = this.textures["buildFocus"];
            sound.play();
        });

        build.on("pointerup", ()=>{
            build.texture = this.textures["build"];
        });

        build.on("pointerout", ()=>{
            build.texture = this.textures["build"];
        });

        let text = new PIXI.Text("P I C R O S S",{fontFamily : 'Rockwell', fontSize: 24, fill : 'white', align: 'center'});
        text.x = (512-text.width)/2;
        text.y = (text.height);
        this.addChild(text);

        let sound = PIXI.sound.Sound.from({
            url: '/picross-project/frontend/res/sound/select.mp3',
            autoPlay: true
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