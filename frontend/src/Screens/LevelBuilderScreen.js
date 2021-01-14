import Button from "../Button.js";
import BoxGrid from "../BoxGrid.js";
import ColorPicker from "../utils/ColorPicker.js"
import ScreenManager from "../utils/ScreenManager.js";
import BackgroundManager from "../utils/BackgroundManager.js";
import Notification from "../Notification.js";

export default class LevelBuilderScreen extends PIXI.Container {
    constructor(data) {
        super();

        this.resolution = data.resolution;
        this.textureSheet = data.textureSheet;

        this.title = new PIXI.AnimatedSprite(data.title.animations["build_bounce"]);
        this.title.animationSpeed = 0.04;
        this.title.play();
        this.title.scale.set(2);
        this.title.position.set((this.resolution.x-this.title.width)/2, 32);
        this.addChild(this.title);

        this.colorPicker = new ColorPicker({textureSheet:this.textureSheet});
        this.addChild(this.colorPicker);

        this.input = new PIXI.TextInput({
            input: {
                fontSize: '20px',
                padding: '10px',
                width: '260px',
                color: '#000000',
                textAlign: "left"
            },
            box: {
                default: {fill: 0xFFFFFF, rounded: 12, stroke: {color: 0xf0f0f0, width: 4}},
            }
        })
        this.input.placeholder = 'Enter puzzle name'
	    this.input.position.set((this.resolution.x-this.input.width)/2, this.resolution.y - this.input.height - 32);
        this.addChild(this.input)
        
        this.boxGrid = new BoxGrid({textureSheet:this.textureSheet, mask:data.mask});
        this.boxGrid.buildBuildGrid(5);
        this.boxGrid.scale.set((this.resolution.y-(this.title.height+this.input.height+128))/this.boxGrid.height);
        this.addChild(this.boxGrid);
        this.boxGrid.position.set((this.resolution.x-this.boxGrid.width)/2, (this.resolution.y-this.boxGrid.height)/2);

        this.buttonMenu = new Button(this.textureSheet.textures["button"], 2, "MENU", () => {
            ScreenManager.changeScreen("MainMenuScreen");
            BackgroundManager.changeColor("blue");
        });
        this.publishLevel = new Button(this.textureSheet.textures["button"], 2, "PUBLISH", () => {
            if(this.input.text=="") {
                if(this.notification) this.removeChild(this.notification);
                this.notification = new Notification("Title required!");
                this.notification.position.set(this.publishLevel.x - this.publishLevel.width/2 - this.notification.width - 8, this.publishLevel.y-this.notification.height/2);
                this.addChild(this.notification);
            } else {
                let data = 
                {
                    title: this.input.text,
                    json:
                    {
                        meta: {
                            title: this.input.text,
                            dimensions:this.boxGrid.boxMap.length
                        },
                        data:this.convertMap(this.boxGrid.boxMap)
                    }
                }
                
                this.sendPuzzle(JSON.stringify(data)).then(()=>{
                    this.reset();
                    if(this.notification) this.removeChild(this.notification);
                    this.notification = new Notification("Publish'd!");
                    this.notification.position.set(this.publishLevel.x - this.publishLevel.width/2 - this.notification.width - 8, this.publishLevel.y-this.notification.height/2);
                    this.addChild(this.notification);
                });
            }
        });
        this.buttonFive = new Button(this.textureSheet.textures["button"], 2, "5x5", () => {
            this.boxGrid.scale.set(1);
            this.boxGrid.buildBuildGrid(5);
            this.boxGrid.scale.set((this.resolution.y-(this.title.height+this.input.height+128))/this.boxGrid.height);
            this.boxGrid.position.set((this.resolution.x-this.boxGrid.width)/2, (this.resolution.y-this.boxGrid.height)/2);
        });
        this.buttonTen = new Button(this.textureSheet.textures["button"], 2, "10x10", () => {
            this.boxGrid.scale.set(1);
            this.boxGrid.buildBuildGrid(10);
            this.boxGrid.scale.set((this.resolution.y-(this.title.height+this.input.height+128))/this.boxGrid.height);
            this.boxGrid.position.set((this.resolution.x-this.boxGrid.width)/2, (this.resolution.y-this.boxGrid.height)/2);
        });
        this.buttonFifteen = new Button(this.textureSheet.textures["button"], 2, "15x15", () => {
            this.boxGrid.scale.set(1);
            this.boxGrid.buildBuildGrid(15);
            this.boxGrid.scale.set((this.resolution.y-(this.title.height+this.input.height+128))/this.boxGrid.height);
            this.boxGrid.position.set((this.resolution.x-this.boxGrid.width)/2, (this.resolution.y-this.boxGrid.height)/2);
        });
        
        this.buttonMenu.position.set(this.resolution.x-this.buttonMenu.width, this.resolution.y-this.buttonMenu.height);
        this.publishLevel.position.set(this.resolution.x-this.publishLevel.width, this.resolution.y-2*this.publishLevel.height);
        this.buttonFive.position.set(this.resolution.x-this.publishLevel.width, this.resolution.y-9*this.publishLevel.height);
        this.buttonTen.position.set(this.resolution.x-this.publishLevel.width, this.resolution.y-8*this.publishLevel.height);
        this.buttonFifteen.position.set(this.resolution.x-this.publishLevel.width, this.resolution.y-7*this.publishLevel.height);
        this.colorPicker.position.set(this.resolution.x-this.publishLevel.width - 48, this.resolution.y-6*this.publishLevel.height);


        this.addChild(this.buttonMenu);
        this.addChild(this.publishLevel);
        this.addChild(this.buttonFive);
        this.addChild(this.buttonTen);
        this.addChild(this.buttonFifteen);

        this.interactive = true;
    }

    convertMap(boxMap) {
        let jsonData = [];

        for(let y = 0; y < boxMap.length; y++) {
            jsonData.push([]);
            for(let x = 0; x < boxMap[y].length; x++) {
                jsonData[y][x] = {filled:boxMap[y][x].filled, color:boxMap[y][x].color}
            }
        }

        return jsonData;
    }

    async sendPuzzle(data) {
        await fetch("http://localhost:3000/api/puzzle" , {method:"POST", body:data});
    }

    reset() {
        this.input.text = "";
        this.boxGrid.scale.set(1);
        this.boxGrid.buildBuildGrid(5);
        this.boxGrid.scale.set((this.resolution.y-(this.title.height+this.input.height+128))/this.boxGrid.height);
        this.boxGrid.position.set((this.resolution.x-this.boxGrid.width)/2, (this.resolution.y-this.boxGrid.height)/2);
    }

    update(delta) {
        if(this.notification) this.notification.update();
    }
}
