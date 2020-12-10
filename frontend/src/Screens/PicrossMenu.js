export default class PicrossMenu extends PIXI.Sprite {
    constructor(textures) {
        super();

        let solo = new PIXI.Sprite(textures["solo"]);
        let online = new PIXI.Sprite(textures["online"]);
        let build = new PIXI.Sprite(textures["build"]);
        let text = new PIXI.Text("P I C R O S S",{fontFamily : 'Rockwell', fontSize: 24, fill : 'white', align: 'center'});
        let sound = PIXI.sound.Sound.from({
            url: '/picross-project/frontend/res/sound/select.mp3',
            autoPlay: true
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
        this.addChild(build);
        this.addChild(online);
        this.addChild(text);
        
        solo.interactive = true;
        build.interactive = true;
        online.interactive = true;
        
        solo.on("pointerdown", ()=>{
            solo.texture = textures["soloFocus"];
            sound.play();
        });
        online.on("pointerdown", ()=>{
            online.texture = textures["onlineFocus"];
            sound.play();
        });
        build.on("pointerdown", ()=>{
            build.texture = textures["buildFocus"];
            sound.play();
        });

        solo.on("pointerup", ()=>{
            solo.texture = textures["solo"];
        });
        online.on("pointerup", ()=>{
            online.texture = textures["online"];
        });
        build.on("pointerup", ()=>{
            build.texture = textures["build"];
        });

        solo.on("pointerout", ()=>{
            solo.texture = textures["solo"];
        });
        online.on("pointerout", ()=>{
            online.texture = textures["online"];
        });
        build.on("pointerout", ()=>{
            build.texture = textures["build"];
        });
    }
}