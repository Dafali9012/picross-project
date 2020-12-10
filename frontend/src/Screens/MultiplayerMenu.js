export default class MultiplayerMenu extends PIXI.Sprite {
    constructor(textures) {
        super();

        let text = new PIXI.Text("Multiplayer",{fontFamily : 'Rockwell', fontSize: 24, fill : 'white', align: 'center'});
        text.x = (512-text.width)/2;
        text.y = (text.height);
        this.addChild(text);

        let host = new PIXI.Sprite(textures["host"]);
        host.x = (512-host.width)/2;
        host.y = (288-host.height)/3;

        this.addChild(host);
        host.interactive = true;
        host.on("pointerdown", ()=>{
            host.texture = textures["hostFocus"];
            sound.play();
        });
        host.on("pointerup", ()=>{
            host.texture = textures["host"];
        });
        host.on("pointerout", ()=>{
            host.texture = textures["host"];
        });

        let join = new PIXI.Sprite(textures["join"]);
        join.x = (512-join.width)/2;
        join.y = (288-join.height)/2;
        
        this.addChild(join);
        join.interactive = true;
        join.on("pointerdown", ()=>{
            join.texture = textures["joinFocus"];
            sound.play();
        });
        join.on("pointerup", ()=>{
            join.texture = textures["join"];
        });
        join.on("pointerout", ()=>{
            join.texture = textures["join"];
        });

        let sound = PIXI.sound.Sound.from({
            url: '/picross-project/frontend/res/sound/select.mp3',
            autoPlay: true
        });

        
    }
}