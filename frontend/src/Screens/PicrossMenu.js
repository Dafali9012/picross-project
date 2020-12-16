import ScreenManager from "../utils/ScreenManager.js";

export default class PicrossMenu extends PIXI.Container {
  constructor(textures) {
    super();
    this.textures = textures;
    this.background = new PIXI.Sprite(this.textures["background"]);
    this.addChild(this.background);
    this.alpha = 0.8;
    this.solo = new PIXI.Sprite(textures["solo"]);
    this.online = new PIXI.Sprite(textures["online"]);
    this.build = new PIXI.Sprite(textures["build"]);
    this.text = new PIXI.Text("P I C R O S S", {
      fontFamily: "Rockwell",
      fontSize: 24,
      fill: "white",
      align: "center",
    });
    this.sound = PIXI.sound.Sound.from({
      url: "./res/sound/select.mp3",
      volume: 0.05,
    });

    this.solo.x = (512 - this.solo.width) / 2;
    this.solo.y = (288 - this.solo.height) / 3;
    this.online.x = (512 - this.online.width) / 2;
    this.online.y = (288 - this.online.height) / 2;
    this.build.x = (512 - this.build.width) / 2;
    this.build.y = this.solo.y * 2;
    this.text.x = (512 - this.text.width) / 2;
    this.text.y = this.text.height;

    this.addChild(this.solo);
    //this.addChild(build);
    //this.addChild(online);
    this.addChild(this.text);

    this.solo.interactive = true;
    this.build.interactive = true;
    this.online.interactive = true;
    this.solo.buttonMode = true;
    this.build.buttonMode = true;
    this.online.buttonMode = true;

    this.solo.on("pointerdown", () => {
      this.solo.texture = this.textures["soloFocus"];
    });
    this.solo.on("mouseover", () => {
      this.solo.alpha = 1.2;
    });
    this.online.on("mouseover", () => {
      this.online.alpha = 1.2;
    });
    this.build.on("mouseover", () => {
      this.build.alpha = 1.2;
    });
    this.online.on("pointerdown", () => {
      online.texture = this.textures["onlineFocus"];
    });
    this.build.on("pointerdown", () => {
      this.build.texture = this.textures["buildFocus"];
    });

    this.solo.on("pointerup", () => {
      this.solo.texture = textures["solo"];
      this.sound.play();
      ScreenManager.changeScreen("puzzlemenu");
    });
    this.online.on("pointerup", () => {
      this.online.texture = textures["online"];
      this.sound.play();
      ScreenManager.changeScreen("multiplayermenu");
    });
    this.build.on("pointerup", () => {
      this.build.texture = this.textures["build"];
      this.sound.play();
    });

    this.solo.on("pointerout", () => {
      this.solo.texture = textures["solo"];
      this.solo.alpha = 1;
    });
    this.online.on("pointerout", () => {
      this.online.texture = textures["online"];
      this.online.alpha = 1;
    });
    this.build.on("pointerout", () => {
      this.build.texture = this.textures["build"];
      this.build.alpha = 1;
    });
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

  update(delta) {
    this.scrollBackground(delta);
  }
}
