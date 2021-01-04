export default class Hints extends PIXI.Container {
    constructor() {
        super();
    }

    buildHints(boxMap, boxGridScale) {
        this.offsetY = 0;

        let filledData = {};
        let hintData = {};

        for(let row = 0; row < boxMap.length; row++) {
            for(let col = 0; col < boxMap[row].length; col++) {
                filledData["row_"+row.toString()] = filledData["row_"+row.toString()]?[...filledData["row_"+row.toString()], boxMap[row][col].filled]:[boxMap[row][col].filled];
                filledData["col_"+col.toString()] = filledData["col_"+col.toString()]?[...filledData["col_"+col.toString()], boxMap[row][col].filled]:[boxMap[row][col].filled];
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
                fontFamily:"myFont",
                fontSize:4, fill:0xFFFFFF,
                stroke:0x000000,
                strokeThickness:1,
                align:"right"
            });
            if(x.match("row")) {
                hintText.position.set(hintText.width*-1, boxMap[0][0].height*boxGridScale * x.substring(4) + (boxMap[0][0].height*boxGridScale-hintText.height)/2);
            }
            if(x.match("col")) {
                hintText.position.set(boxMap[0][0].width*boxGridScale * x.substring(4) + (boxMap[0][0].width*boxGridScale-hintText.width)/2,hintText.height*-1);
            }
            this.addChild(hintText);
        });
    }
}