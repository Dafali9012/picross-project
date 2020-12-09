//import ScreenManager from "../utils/ScreenManager.js";

export default class PuzzleSelectMenu extends PIXI.Sprite {
    constructor(textures) {
        super();

        let text = new PIXI.Text("Puzzle select",{fontFamily : 'Rockwell', fontSize: 24, fill : 'white', align: 'center'});
        text.x = (512-text.width)/2;
        text.y = (text.height);

        let levelBrowser = new PIXI.Sprite(textures["levelBrowser"]);
        levelBrowser.x = (512-levelBrowser.width)/2;
        levelBrowser.y = (288-levelBrowser.height)/3;
        levelBrowser.interactive = true;

        let random = new PIXI.Sprite(textures["random"]);
        random.x = (512-random.width)/2;
        random.y = (288-random.height)/2;
        random.interactive = true;

        let sound = PIXI.sound.Sound.from({
            url: '/picross-project/frontend/res/sound/select.mp3',
            autoPlay: true
        });

        //const container = new PIXI.Container();

        //container.addChild(levelBrowser);
        //container.addChild(random);

        //new ScreenManager(container);

        levelBrowser.on("pointerdown", ()=>{
            levelBrowser.texture = textures["levelBrowserFocus"];
            sound.play();
        });
        random.on("pointerdown", ()=>{
            random.texture = textures["randomFocus"];
            sound.play();
        });
        
        levelBrowser.on("pointerup", ()=>{
            levelBrowser.texture = textures["levelBrowser"];
        });
        random.on("pointerup", ()=>{
            random.texture = textures["random"];
        });
        
        levelBrowser.on("pointerout", ()=>{
            levelBrowser.texture = textures["levelBrowser"];
        });
        random.on("pointerout", ()=>{
            random.texture = textures["random"];
        });
    }
}