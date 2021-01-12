import HSL2HEX from "./HSL2HEX.js";

export default class ColorPicker extends PIXI.Sprite {
  constructor(data) {
    super();
    this.textureSheet = data.textureSheet;
    this.bg = new PIXI.Sprite(this.textureSheet.textures["slider_bg"]);
    this.line = new PIXI.Sprite(this.textureSheet.textures["slider_line"]);
    this.line.y = this.bg.height * 2 + 15;
    this.slider = new PIXI.Sprite(this.textureSheet.textures["slider_button"]);
    this.selectedColor = PIXI.Sprite.from("/frontend/res/selected.png");
    this.selectedColor.y = -12
    this.selectedColor.x = -35
    this.selectedColor.width = 200 ;
    this.selectedColor.height = 70;
    this.selectedColor.tint = 23013
    this.slider.width = 5;
    this.slider.height = 8;

    this.slider.anchor.set(0.5);
    this.slider.position.set(this.slider.width, this.bg.height * 2 + 31);

    this.hue = 0;
    this.bg.height = 100;
    this.bg.width = this.line.width;
    this.bg.tint = 0xe3e3e3;

    this.addChild(this.bg);
    this.addChild(this.line);
    this.addChild(this.slider);
    this.bg.addChild(this.selectedColor);


    this.slider.interactive = true;
    this.slider.buttonMode = true;
    this.generateColorSample(this.bg.width, this.selectedColor);

    this.slider.on("mousedown", () => {
      this.slider.drag = true;
    });
    document.addEventListener("mouseup", () => {
      this.slider.drag = false;
    });
    this.slider.on("mousemove", (e) => {
      if (this.slider.drag) {
        let newPosition = e.data.getLocalPosition(this.slider.parent);
        this.slider.position.x = newPosition.x;
        if (this.slider.x < this.slider.width / 2)
          this.slider.x = this.slider.width / 2;
        if (this.slider.x >= 96 - this.slider.width / 2)
          this.slider.x = 96 - this.slider.width / 2;

        this.hue = (1 / 80) * (this.slider.x - this.slider.width / 2) * 359;
        this.selectedColor.tint = HSL2HEX.convert(this.hue, 100, 50);
      }
    });
  }
  generateColorSample(width, color) {
    const defaultColors = [
      0xffff19,
      0xff1919,
      0x00ff00,
      0x0000ff,
      0x000000,
      0xffffff,
      0xc46210,
      0x43c4c4,
      0x7070c4,
      0xb925c4,
      0x30ffff,
      0xff668f,
      0x1414ff,
      0xffffb3,
      0xff668f,
      0x1414ff,
      0xffffb3,
      0x1414ff,
    ];
    let selectedColor = color
    let positionY = this.y + 3;
    let positionX = 5;
    let currentWidth = width;

    for (let i = 0; i < defaultColors.length; i++) {
      if (positionX + 12 > currentWidth) {
        positionX = 5;
        positionY += 5;
      }
      let square = new PIXI.Graphics();
      square.beginFill(defaultColors[i]);
      square.drawRect(positionX, positionY, 12, 4);
      square.interactive = true;
      square.cursor = "pointer";

      square.on("pointerdown",getColor);
      function getColor() {
        selectedColor.tint = square.fill.color;
      }

      this.bg.addChild(square);
      positionX += 15;
    }
  }
}
