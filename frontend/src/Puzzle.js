import Box from "./Box.js";

export default class Puzzle extends PIXI.Container {
    constructor(puzzleData, textures) {
        super();
        let yMargin = 100;
        for(let row = 0; row < puzzleData.data.length; row++) {
            for(let col = 0; col < puzzleData.data[row].length; col++) {
                let newBox = new Box(textures);
                newBox.width = 288/puzzleData.data.length - yMargin/puzzleData.data.length;
                newBox.height = newBox.width;
                newBox.x = col * newBox.width;
                newBox.y = yMargin/2 + row * newBox.width;
                newBox.color = puzzleData.data[row][col]["color"];
                newBox.expectFilled = puzzleData.data[row][col]["filled"];
                this.addChild(newBox);
            }
        }
    }
}