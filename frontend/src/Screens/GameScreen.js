import Puzzle from "../Puzzle.js";
import ScreenManager from "../utils/ScreenManager.js";

export default class GameScreen extends PIXI.Container {
    constructor(data) {
        super();
        this.textureSheet = data.textureSheet;
        this.background = new PIXI.Sprite(data.background);
        this.addChild(this.background);
        this.puzzle = new Puzzle(data);
        this.puzzle.x = (512-this.puzzle.width)/2;
        this.addChild(this.puzzle);
        this.won = false;
        let sound = PIXI.sound.Sound.from({
            url: "./res/sound/select.mp3",
            autoPlay: true,
        });

        let back = new PIXI.Sprite(this.textureSheet.textures["back"]);
        back.x = ((512-this.puzzle.width)/2 + this.puzzle.width + (((512-this.puzzle.width)/2-back.width)/2));
        back.y = (288-(back.height)*3);
        this.restart = new PIXI.Sprite(this.textureSheet.textures["restart"]);
        this.addChild(this.restart);
        this.restart.position.set((512-this.puzzle.width)/2 + this.puzzle.width + (((512-this.puzzle.width)/2-this.restart.width)/2), this.puzzle.height-this.restart.height/2);
        this.restart.interactive = true;
        this.restart.buttonMode = true;
        back.interactive = true;
        this.addChild(back)

        this.restart.on("click", ()=>{
            console.log("restart");
        });
        this.restart.on("mousedown", ()=>{
            this.restart.texture = this.textureSheet.textures["restartFocus"];
        });
        this.restart.on("mouseout", ()=> {
            this.restart.texture = this.textureSheet.textures["restart"];
        });
        this.restart.on("mouseup", ()=> {
            this.restart.texture = this.textureSheet.textures["restart"];
            sound.play();
        });
        back.on("pointerdown", ()=>{
            back.texture = this.textureSheet.textures["backFocus"];
        });
        back.on("pointerup", ()=>{
            back.texture = this.textureSheet.textures["back"];
            sound.play();
        });
        back.on("pointerout", ()=>{
            back.texture = this.textureSheet.textures["back"];
        });

        this.interactive = true;
        this.on("mouseup", ()=>{
            console.log("checking win");
            if(this.puzzle.checkWin()) {
                this.won = true;
                this.removeListener("mouseup");
                this.puzzle.boxBox.children.forEach(x=>{
                    x.removeAllListeners();
                    x.buttonMode = false;
                });
            }
        });
    }

    scrollBackground(delta) {
        this.background.x = (this.background.x+0.4*delta<0)?this.background.x+0.4*delta:-32;
        this.background.y = (this.background.y+0.2*delta<0)?this.background.y+0.2*delta:-32;
    }

    revealPicture() {
        this.puzzle.boxBox.children.forEach(x=>{
            x.revealColor();
        });
        this.puzzle.fadeOutHints();
        this.puzzle.fadeInTitle();
    }

    update(delta) {
        this.scrollBackground(delta);
        if(this.won) this.revealPicture();
    }
}