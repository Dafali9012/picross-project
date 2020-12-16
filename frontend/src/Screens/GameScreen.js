import Puzzle from "../Puzzle.js";
import ScreenManager from "../utils/ScreenManager.js";
import Input from "../utils/Input.js";

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

        let back = PIXI.sound.Sound.from({
            url: "./res/sound/back.mp3",
            volume: 0.1
        });
        let select = PIXI.sound.Sound.from({
            url: "./res/sound/select.mp3",
            volume: 0.1
        });
        let soundReload = PIXI.sound.Sound.from({
            url: "./res/sound/reload.mp3",
            volume: 0.1
        });
        this.soundFinish = PIXI.sound.Sound.from({
            url: "./res/sound/finish.mp3",
            volume: 0.03
        });
        this.soundtrack = PIXI.sound.Sound.from({
            url: "./res/sound/soundtrackCalm.mp3",
            autoPlay: false,
            preload: true,
            volume: 0.1
        });

        let mainmenu = new PIXI.Sprite(this.textureSheet.textures["button_menu"]);
        let audio = new PIXI.Sprite(this.textureSheet.textures["button_audio_on"]);
        audio.x = ((512-this.puzzle.width)/2 + this.puzzle.width + (((512-this.puzzle.width)/2-mainmenu.width)/2));
        audio.y = mainmenu.height*2;
        mainmenu.x = ((512-this.puzzle.width)/2 + this.puzzle.width + (((512-this.puzzle.width)/2-mainmenu.width)/2));
        mainmenu.y = this.puzzle.height-mainmenu.height/2;
        this.restart = new PIXI.Sprite(this.textureSheet.textures["button_restart"]);
        this.addChild(this.restart);
        this.restart.position.set((512-this.puzzle.width)/2 + this.puzzle.width + (((512-this.puzzle.width)/2-this.restart.width)/2), (288-(this.restart.height)*3));
        this.restart.interactive = true;
        this.restart.buttonMode = true;
        mainmenu.buttonMode = true;
        mainmenu.interactive = true;
        audio.interactive = true;
        audio.buttonMode = true;
        this.addChild(mainmenu);
        //this.addChild(audio);
        this.soundtrack.loop = true;

        this.restart.on("click", ()=>{
            console.log("restart");
        });

        this.restart.on("mousedown", ()=>{
            this.restart.texture = this.textureSheet.textures["button_restart_down"];
        });

        this.restart.on("mouseout", ()=> {
            this.restart.texture = this.textureSheet.textures["button_restart"];
        });

        this.restart.on("mouseup", ()=> {
            this.restart.texture = this.textureSheet.textures["button_restart"];
            soundReload.play();
            this.soundtrack.stop();
            this.newPuzzle({puzzleData:data.puzzleData});
            audio.texture = this.textureSheet.textures["button_audio_on"];
        });

        mainmenu.on("pointerdown", ()=>{
            mainmenu.texture = this.textureSheet.textures["button_menu_down"];
        });
        audio.on("pointerdown", ()=>{
            audio.texture = this.textureSheet.textures["button_audio_off"];
        });

        mainmenu.on("pointerup", ()=>{
            mainmenu.texture = this.textureSheet.textures["button_menu"];
            back.play();
            this.soundtrack.stop();
            ScreenManager.visitedScreens = [];
            ScreenManager.changeScreen("picrossmenu");
        });
        audio.on("click", ()=>{
            select.play();
            if(this.soundtrack.isPlaying) {
                audio.texture = this.textureSheet.textures["button_audio_off"];
                //this.soundtrack.pause();
            } else {
                audio.texture = this.textureSheet.textures["button_audio_on"];
                //this.soundtrack.resume();
            }
        });

        mainmenu.on("pointerout", ()=>{
            mainmenu.texture = this.textureSheet.textures["button_menu"];
        });

        this.interactive = true;
    }

    newPuzzle(data) {
        this.won = false;

        this.on("pointerup", ()=>{
            console.log("checking win");
            if(this.puzzle.checkWin()) {
                this.won = true;
                this.soundFinish.play();
                this.removeListener("mouseup");
                this.puzzle.boxBox.children.forEach(x=>{
                    x.removeAllListeners();
                    x.buttonMode = false;
                });
                Input.operation = "";
            }
        });
        
        this.removeChild(this.puzzle);

        if(data.puzzleData) this.puzzle = new Puzzle({textureSheet:this.textureSheet, puzzleData:data.puzzleData});
        else if(data.puzzleSize) this.puzzle = new Puzzle({textureSheet:this.textureSheet, puzzleSize:data.puzzleSize});

        this.puzzle.x = (512-this.puzzle.width)/2;
        this.addChild(this.puzzle);
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