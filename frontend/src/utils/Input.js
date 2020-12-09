export default class Input {
    constructor(stage){

        this.leftClickHold = false;
        this.rightClickHold = false;

        document.addEventListener("contextmenu", e => {e.preventDefault();});

        stage.interactive = true;

        stage.on('mousedown', this.onLeftHold.bind(this));
        stage.on('mouseup', this.onLeftRelease.bind(this));        
        stage.on('rightdown', this.onRightHold.bind(this));
        stage.on('rightup', this.onRightRelease.bind(this));
    }
    leftClick() {
        console.log("leftclick");
    }

    rightClick() {
        console.log("rightclick");
    }
    onLeftHold() {
        this.leftClickHold = true;
        console.log("Left hold, " + this.leftClickHold)
    }
    
    onLeftRelease() {
        this.leftClickHold = false;
        console.log("Left release, " + this.leftClickHold)
    }

    onRightHold() {
        this.rightClickHold = true;
        console.log("Right hold, " + this.rightClickHold)
    }
    
    onRightRelease() {
        this.rightClickHold = false;
        console.log("Right release, " + this.rightClickHold)
    }
    
    onLeftClickMove() {
        if (this.leftClickHold) {
            
        }
    }
    onRightClickMove() {
        if (this.rightClickHold) {
            
        }
    }
}