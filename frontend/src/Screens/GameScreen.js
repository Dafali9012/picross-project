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
    this.puzzle.x = (512 - this.puzzle.width) / 2;
    this.addChild(this.puzzle);
    this.won = false;
    this.back = PIXI.sound.Sound.from({
      url: "./res/sound/back.mp3",
      volume: 0.05,
    });
    this.select = PIXI.sound.Sound.from({
      url: "./res/sound/select.mp3",
      volume: 0.05,
    });
    this.soundReload = PIXI.sound.Sound.from({
      url: "./res/sound/reload.mp3",
      volume: 0.05,
    });
    this.soundFinish = PIXI.sound.Sound.from({
      url: "./res/sound/finish.mp3",
      volume: 0.05,
    });
    this.soundtrack = PIXI.sound.Sound.from({
      url: "./res/sound/soundtrack.mp3",
      autoPlay: false,
      volume: 0.03,
      preload: true,
    });

    this.mainmenu = new PIXI.Sprite(this.textureSheet.textures["mainmenu"]);
    this.audio = new PIXI.Sprite(this.textureSheet.textures["audio"]);
    this.audio.x =
      (512 - this.puzzle.width) / 2 +
      this.puzzle.width +
      ((512 - this.puzzle.width) / 2 - this.mainmenu.width) / 2;
    this.audio.y = this.mainmenu.height * 2;
    this.mainmenu.x =
      (512 - this.puzzle.width) / 2 +
      this.puzzle.width +
      ((512 - this.puzzle.width) / 2 - this.mainmenu.width) / 2;
    this.mainmenu.y = this.puzzle.height - this.mainmenu.height / 2;
    this.restart = new PIXI.Sprite(this.textureSheet.textures["restart"]);
    this.addChild(this.restart);
    this.restart.position.set(
      (512 - this.puzzle.width) / 2 +
        this.puzzle.width +
        ((512 - this.puzzle.width) / 2 - this.restart.width) / 2,
      288 - this.restart.height * 3
    );
    this.restart.interactive = true;
    this.restart.buttonMode = true;
    this.mainmenu.buttonMode = true;
    this.mainmenu.interactive = true;
    this.audio.interactive = true;
    this.audio.buttonMode = true;
    this.addChild(this.mainmenu);
    this.addChild(this.audio);
    this.soundtrack.loop = true;

    this.restart.on("click", () => {
      console.log("restart");
    });

    this.restart.on("mouseover", () => {
      this.restart.alpha = 1.2;
      this.restart.texture = this.textureSheet.textures["restart"];
    });

    this.restart.on("mousedown", () => {
      this.restart.texture = this.textureSheet.textures["restartFocus"];
      this.restart.y = this.restart.y + 1;
    });

    this.restart.on("mouseout", () => {
      this.restart.alpha = 1;
      this.restart.texture = this.textureSheet.textures["restart"];
    });

    this.restart.on("mouseup", () => {
      this.restart.texture = this.textureSheet.textures["restart"];
      this.restart.y = this.restart.y - 1;
      this.soundReload.play();
      this.soundtrack.stop();
      this.newPuzzle(null, this.puzzleSize);
      this.audio.texture = this.textureSheet.textures["audio"];
    });

    this.mainmenu.on("pointerdown", () => {
      this.mainmenu.texture = this.textureSheet.textures["mainmenuFocus"];
    });
    this.audio.on("pointerdown", () => {
      this.audio.texture = this.textureSheet.textures["audioSilent"];
    });

    this.mainmenu.on("mouseover", () => {
      this.mainmenu.alpha = 1.2;
    });

    this.mainmenu.on("pointerup", () => {
      this.mainmenu.texture = this.textureSheet.textures["mainmenu"];
      this.back.play();
      this.soundtrack.stop();
      ScreenManager.visitedScreens = [];
      ScreenManager.changeScreen("picrossmenu");
    });
    this.audio.on("click", () => {
      this.select.play();
      if (this.soundtrack.isPlaying) {
        this.audio.texture = this.textureSheet.textures["audioSilent"];
        this.soundtrack.pause();
      } else {
        this.audio.texture = this.textureSheet.textures["audio"];
        this.soundtrack.resume();
      }
    });

    this.mainmenu.on("pointerout", () => {
      this.mainmenu.texture = this.textureSheet.textures["mainmenu"];
      this.mainmenu.alpha = 1;
    });

    this.interactive = true;
  }

  newPuzzle(puzzleData, puzzleSize) {
    this.puzzleSize = puzzleSize;
    this.won = false;
    this.alpha = 0.8;
    this.on("mouseup", () => {
      console.log("checking win");
      if (this.puzzle.checkWin()) {
        this.won = true;
        this.soundFinish.play();
        this.removeListener("mouseup");
        this.puzzle.boxBox.children.forEach((x) => {
          x.removeAllListeners();
          x.buttonMode = false;
        });
        Input.operation = "";
      }
    });
    this.removeChild(this.puzzle);
    if (puzzleData)
      this.puzzle = new Puzzle({
        textureSheet: this.textureSheet,
        background: this.background,
        puzzleData: puzzleData,
      });
    else if (puzzleSize)
      this.puzzle = new Puzzle({
        textureSheet: this.textureSheet,
        background: this.background,
        puzzleSize: puzzleSize,
      });
    this.puzzle.x = (512 - this.puzzle.width) / 2;
    this.addChild(this.puzzle);
    this.soundtrack.play();
  }

  scrollBackground(delta) {
    this.background.x =
      this.background.x + 0.4 * delta < 0
        ? this.background.x + 0.4 * delta
        : -32;
    this.background.y =
      this.background.y + 0.2 * delta < 0
        ? this.background.y + 0.2 * delta
        : -32;
  }

  revealPicture() {
    this.puzzle.boxBox.children.forEach((x) => {
      x.revealColor();
    });
    this.puzzle.fadeOutHints();
    this.puzzle.fadeInTitle();
  }

  update(delta) {
    this.scrollBackground(delta);
    if (this.won) this.revealPicture();
  }
}
