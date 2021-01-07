export default class ColorPicker extends PIXI.Container {
  constructor(width, height, x, y) {
    super();
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.body = this.createColorPickerBody(width, height);
    this.generateBasicColors(width,y,x);
  }

  createColorPickerBody(width, height) {
    let body = new PIXI.Graphics();
    body.beginFill(0xffffff);
    body.drawRect(this.x, this.y, width, height);
    super.addChild(body);
    return body;
  }

  generateBasicColors(width,y,x) {
    let positionY = y + 10;
    let positionX = x + 5;
    let currentWidth = width;

    let colors = [
      0xe08080,
      0xe0e180,
      0x80e180,
      0x00e180,
      0x80e1e1,
      0x00e1e1,
      0xe180e1,
      0xe08080,
      0xe0e180,
      0x80e180,
      0x00e180,
      0x80e1e1,
      0x00e1e1,
      0xe180e1,
      0xe08080,
      0xe0e180,
      0x80e180,
      0x00e180,
      0x80e1e1,
      0x00e1e1,
      0xe180e1,
      0xe08080,
      0xe0e180,
      0x80e180,
      0x00e180,
      0x80e1e1,
      0x00e1e1,
      0xe180e1,
      0xe08080,
      0xe0e180,
      0x80e180,
      0x00e180,
      0x80e1e1,
      0x00e1e1,
      0xe180e1,
      0xe08080,
      0xe0e180,
      0x80e180,
      0x00e180,
      0x80e1e1,
      0x00e1e1,
      0xe180e1,
      0xe08080,
      0xe0e180,
      0x80e180,
      0x00e180,
      0x80e1e1,
      0x00e1e1,
      0xe180e1,
    ];
    
    for (let i = 0; i < colors.length; i++) {
        console.log("Width", width);
        console.log("positionX", positionX);
        console.log("positionY", positionY);
        console.log(positionX + 20 > width, `${positionX + 20}`);
     
        if (positionX + 20 > width) {
        positionX = this.x + 5;
        positionY += 20;
      }

      let square = new PIXI.Graphics();
      square.beginFill(colors[i]);
      square.drawRect(positionX, positionY, 10, 10);
      super.addChild(square);
      positionX += 20;
    }
  }
}
