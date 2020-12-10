
export default class PuzzleSelectMenu extends PIXI.Sprite {
    constructor(textures) {
        super();

        let text = new PIXI.Text("Puzzle select",{fontFamily : 'Rockwell', fontSize: 24, fill : 'white', align: 'center'});
        text.x = (512-text.width)/2;
        text.y = (text.height);
        this.addChild(text);

        let levelBrowser = new PIXI.Sprite(textures["levelBrowser"]);
        levelBrowser.x = (512-levelBrowser.width)/2;
        levelBrowser.y = (288-levelBrowser.height)/3;

        this.addChild(levelBrowser);
        levelBrowser.interactive = true;
        levelBrowser.on("pointerdown", ()=>{
            levelBrowser.texture = textures["levelBrowserFocus"];
            sound.play();
        });
        levelBrowser.on("pointerup", ()=>{
            levelBrowser.texture = textures["levelBrowser"];
        });
        levelBrowser.on("pointerout", ()=>{
            levelBrowser.texture = textures["levelBrowser"];
        });

        let random = new PIXI.Sprite(textures["random"]);
        random.x = (512-random.width)/2;
        random.y = (288-random.height)/2;
        
        this.addChild(random);
        random.interactive = true;
        random.on("pointerdown", ()=>{
            random.texture = textures["randomFocus"];
            sound.play();
        });
        random.on("pointerup", ()=>{
            random.texture = textures["random"];
        });
        random.on("pointerout", ()=>{
            random.texture = textures["random"];
        });

        let sound = PIXI.sound.Sound.from({
            url: '/picross-project/frontend/res/sound/select.mp3',
            autoPlay: true
        });

        
    }
}