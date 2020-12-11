import Box from "./Box.js";

export default class Puzzle extends PIXI.Container {
    constructor(data) {
        super();
        this.puzzleData = data.puzzleData;
        this.textureSheet = data.textureSheet;
        this.topMargin = 60;
        this.bottomMargin = 20;
        this.textMargin = 4;
        this.boxStructure = [];
        this.boxBox = new PIXI.Container();
        this.boxSize = 288/this.puzzleData.data.length-(this.topMargin+this.bottomMargin)/this.puzzleData.data.length;
        this.buildBoxStructure();
        this.buildHints();
    }

    buildBoxStructure() {
        for(let row = 0; row < this.puzzleData.data.length; row++) {
            this.boxStructure[row] = [];
            for(let col = 0; col < this.puzzleData.data[row].length; col++) {
                let newBox = new Box(this.textureSheet, this.boxSize);
                newBox.width = this.boxSize;
                newBox.height = this.boxSize;
                newBox.x = col * this.boxSize;
                newBox.y = row * this.boxSize;
                newBox.color = this.puzzleData.data[row][col]["color"];
                newBox.solutionFilled = this.puzzleData.data[row][col]["filled"];
                this.boxStructure[row][col] = newBox;
                this.boxBox.addChild(newBox);
            }
        }
        this.boxBox.y = this.topMargin;
        this.addChild(this.boxBox);
    }

    buildHints() {
        let hints = new PIXI.Container();
        let filledData = {};
        let hintData = {};

        for(let row = 0; row < this.boxStructure.length; row++) {
            for(let col = 0; col < this.boxStructure[row].length; col++) {
                filledData["row_"+row.toString()] = filledData["row_"+row.toString()]?[...filledData["row_"+row.toString()], this.boxStructure[row][col].solutionFilled]:[this.boxStructure[row][col].solutionFilled];
                filledData["col_"+col.toString()] = filledData["col_"+col.toString()]?[...filledData["col_"+col.toString()], this.boxStructure[row][col].solutionFilled]:[this.boxStructure[row][col].solutionFilled];
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
            let numberBlock = new PIXI.Container();
            let numberCounter = 0;
            hintData[x].forEach((y,i)=>{
                for(let n = 0; n < y.toString().length; n++) {
                    let char = new PIXI.Sprite(this.textureSheet.textures["number_"+y.toString()[n]]);
                    char.width = (5);
                    char.height = (5);
                    if(x.match("row")) {
                        char.position.set(numberCounter*char.width+n*char.width, parseInt(x.substr(4, x.length))*this.boxSize + (this.boxSize-char.height)/2);
                        numberBlock.addChild(char);
                    }
                    if(x.match("col")) {
                        char.position.set((this.boxSize-char.width)/2 + parseInt(x.substr(4, x.length))*this.boxSize - (y.toString().length-1)*char.width/2 + n*char.width, numberCounter*(char.height+1));
                        numberBlock.addChild(char);
                    }
                }
                numberCounter++;
                if(i < hintData[x].length-1 && x.match("row")) numberCounter++;
            });
            if(x.match("row")) numberBlock.position.set(numberBlock.width*-1-this.textMargin,0);
            if(x.match("col")) numberBlock.position.set(0,numberBlock.height*-1-this.textMargin);
            hints.y = this.topMargin;
            hints.addChild(numberBlock);
        });
        this.addChild(hints);
        this.children.forEach(item=>{
            item.x += (hints.width+this.boxSize/2-this.boxSize*this.boxStructure.length)/2;
        });
    }

    checkWin() {
        for(let row = 0; row < this.boxStructure.length; row++) {
            for(let col = 0; col < this.boxStructure[row].length; col++) {
                if((this.boxStructure[row][col].solutionFilled && this.boxStructure[row][col].state != "filled") ||
                (!this.boxStructure[row][col].solutionFilled && this.boxStructure[row][col].state == "filled")) return false;
            }
        }
        return true;
    }

    update(delta) {
        
    }
}