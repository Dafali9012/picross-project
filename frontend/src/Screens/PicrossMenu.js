export default class PicrossMenu extends PIXI.Sprite {
    constructor(textures) {
        super();
        this.texture = textures["background"];

        let solo = new PIXI.Sprite(textures["solo"]);
        let online = new PIXI.Sprite(textures["online"]);
        let build = new PIXI.Sprite(textures["build"]);

        solo.interactive = true;
        online.interactive = true;
        build.interactive = true;

        solo.x = (512-solo.width)/2;
        solo.y = (288-solo.height)/3;
        online.x = (512-online.width)/2;
        online.y = (288-online.height)/2;
        build.x = (512-build.width)/2;
        build.y = (288-build.height)/6;

        this.addChild(solo);
        this.addChild(online);
        this.addChild(build);

        solo.on("pointerdown", ()=>{
            solo.texture = textures["soloFocus"];
        });
        online.on("pointerdown", ()=>{
            online.texture = textures["onlineFocus"];
        });
        build.on("pointerdown", ()=>{
            build.texture = textures["buildFocus"];
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