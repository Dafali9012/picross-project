import Box from "./Box.js";
import HSL2HEX from "./utils/HSL2HEX.js";

export default class BoxGrid extends PIXI.Container {
    constructor(data) {
        super();
        this.textureSheet = data.textureSheet;
        this.resultMask = new PIXI.Sprite(data.mask);
        this.boxGrid = new PIXI.Container();
        this.addChild(this.boxGrid);
    }

    resetState() {
        this.boxMap = [];
        this.hintMap = [];
        this.boxGrid.removeChildren();

        this.removeChild(this.resultMask);
        this.boxGrid.mask = null;
    }

    buildGridRandom(size) {
        this.resetState();
        let randColor = HSL2HEX.convert(Math.random()*360, 100, 50);
        for(let y = 0; y < size; y++) {
            this.boxMap.push([]);
            for(let x = 0; x < size; x++) {
                let box = new Box({textureSheet:this.textureSheet});
                box.filled = Math.round(Math.random()+0.1);
                box.color = box.filled?randColor:0xFFFFFF;
                box.position.set(x*box.width, y*box.height);
                this.boxGrid.addChild(box);
                this.boxMap[y][x] = box;
            }
        }
        this.resultMask.width = this.boxGrid.width;
        this.resultMask.height = this.boxGrid.height;
    }

    buildGrid(json) {
        this.resetState();
        for(let y = 0; y < json.data.length; y++) {
            this.boxMap.push([]);
            for(let x = 0; x < json.data[y].length; x++) {
                let box = new Box({textureSheet:this.textureSheet});
                box.filled = json.data[y][x].filled;
                box.color = json.data[y][x].color;
                box.position.set(x*box.width, y*box.height);
                this.boxGrid.addChild(box);
                this.boxMap[y][x] = box;
            }
        }
        this.resultMask.width = this.boxGrid.width;
        this.resultMask.height = this.boxGrid.height;
    }

    getBoxMap() {
        return this.boxMap;
    }

    isSolved() {
        for(let y = 0; y < this.boxMap.length; y++) {
            for(let x = 0; x < this.boxMap[y].length; x++) {
                if(this.boxMap[y][x].filled == true) {
                    if(this.boxMap[y][x].state != "filled") return false;
                }
                if(this.boxMap[y][x].filled == false) {
                    if(this.boxMap[y][x].state == "filled") return false;
                }
            }
        }
        return true;
    }

    revealResult() {
        for(let box of this.boxGrid.children) box.revealColor();
        this.addChild(this.resultMask);
        this.boxGrid.mask = this.resultMask;
    }
}