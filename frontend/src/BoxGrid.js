import Box from "./Box.js";
import HSL2HEX from "./utils/HSL2HEX.js";

export default class BoxGrid extends PIXI.Container {
    constructor(data) {
        super();
        this.textureSheet = data.textureSheet;
        this.resultMask = new PIXI.Sprite(data.mask);
        this.boxGrid = new PIXI.Container();
        this.addChild(this.boxGrid);
        this.lines = new PIXI.Container();
        this.addChild(this.lines);
        this.hints = new PIXI.Container();
        this.addChild(this.hints);

        this.yOffset = 0;
    }

    resetState() {
        this.boxMap = [];
        this.hintMap = [];
        this.hints.removeChildren();
        this.boxGrid.removeChildren();
        this.lines.removeChildren();

        this.removeChild(this.resultMask);
        this.boxGrid.mask = null;

        this.xOffset = 0;
        this.yOffset = 0;
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
        this.drawLines();
        this.buildHints();
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
        this.drawLines();
        this.buildHints();
    }

    drawLines() {
        for(let i = 1; i < this.boxMap.length/5; i++) {
            let line = new PIXI.Graphics();
            line.lineStyle(2,0x00bde7);
            line.moveTo(0,i * this.boxMap[0][0].height*5);
            line.lineTo(this.boxGrid.width,i * this.boxMap[0][0].height*5);
            this.lines.addChild(line);
        }
        for(let i = 1; i < this.boxMap[0].length/5; i++) {
            let line = new PIXI.Graphics();
            line.lineStyle(2,0x00bde7);
            line.moveTo(i * this.boxMap[0][0].width*5, 0);
            line.lineTo(i * this.boxMap[0][0].width*5, this.boxGrid.height);
            this.lines.addChild(line);
        }
    }

    buildHints() {
        let filledData = {};
        let hintData = {};

        for(let row = 0; row < this.boxMap.length; row++) {
            for(let col = 0; col < this.boxMap[row].length; col++) {
                filledData["row_"+row.toString()] = filledData["row_"+row.toString()]?[...filledData["row_"+row.toString()], this.boxMap[row][col].filled]:[this.boxMap[row][col].filled];
                filledData["col_"+col.toString()] = filledData["col_"+col.toString()]?[...filledData["col_"+col.toString()], this.boxMap[row][col].filled]:[this.boxMap[row][col].filled];
            }
        }

        Object.keys(filledData).forEach(x=>{
            let group = 0;
            filledData[x].forEach((y,i)=>{
                if(y==true) group++;
                if((y==false || i==filledData[x].length-1) && group > 0) {
                    hintData[x] = hintData[x]?[...hintData[x], group]:[group];
                    group = 0;
                }
            });
            if(!hintData[x]) hintData[x] = [group];
        });

        Object.keys(hintData).forEach((x)=>{
            let text = "";
            hintData[x].forEach((y)=>{
                if(x.match("row")) {
                    text = text.concat(y+" ");
                }
                if(x.match("col")) {
                    text = text.concat(y+"\n");
                }
            });
            text = text.substring(0, text.length-1);
            let hintText = new PIXI.Text(text, {
                fontFamily:"Verdana",
                fontSize:32, fill:0xFFFFFF,
                stroke:0x000000,
                strokeThickness:0,
                align:"center"
            });
            hintText.scale.set(0.5);
            if(x.match("row")) {
                hintText.position.set(hintText.width*-1, this.boxMap[0][0].height * x.substring(4) + (this.boxMap[0][0].height-hintText.height)/2);
                if(hintText.width > this.xOffset) this.xOffset = hintText.width;
            }
            if(x.match("col")) {
                hintText.position.set(this.boxMap[0][0].width * x.substring(4) + (this.boxMap[0][0].width-hintText.width)/2,hintText.height*-1);
                if(hintText.height > this.yOffset) this.yOffset = hintText.height;
            }
            this.hints.addChild(hintText);
        });
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
        this.hints.removeChildren();
        this.lines.removeChildren();
        for(let box of this.boxGrid.children) box.revealColor();
        this.addChild(this.resultMask);
        this.boxGrid.mask = this.resultMask;
    }
}