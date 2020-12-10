export default class MultiplayerMenu extends PIXI.Sprite {
    constructor(textures) {
        super();

        let host = new PIXI.Sprite(textures["host"]);
        let join = new PIXI.Sprite(textures["join"]);
        let text = new PIXI.Text("Multiplayer", {fontFamily: "Rockwell", fontSize: 24, fill: "white", align: "center"});
        let sound = PIXI.sound.Sound.from({
            url: "/picross-project/frontend/res/sound/select.mp3",
            autoPlay: true,
        });

        host.x = (512 - host.width) / 2;
        host.y = (288 - host.height) / 3;
        join.x = (512 - join.width) / 2;
        join.y = (288 - join.height) / 2;
        text.x = (512 - text.width) / 2;
        text.y = text.height;

        this.addChild(host);
        this.addChild(join);
        this.addChild(text);
        
        host.interactive = true;
        join.interactive = true;

        host.on("pointerdown", () => {
            host.texture = textures["hostFocus"];
            sound.play();
        });
        join.on("pointerdown", () => {
            join.texture = textures["joinFocus"];
            sound.play();
        });

        host.on("pointerup", () => {
            host.texture = textures["host"];
        });
        join.on("pointerup", () => {
            join.texture = textures["join"];
        });

        host.on("pointerout", () => {
            host.texture = textures["host"];
        });
        join.on("pointerout", () => {
            join.texture = textures["join"];
        });
    }
}
