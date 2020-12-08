export default class Input {
    constructor(){
        this.leftClickHold = false;
        this.rightClickHold = false;
        console.log("Input constructor")
        document.addEventListener('mousedown', this.onLeftHold);
        document.addEventListener('mouseup', this.onLeftRelease);        
        document.addEventListener('rightdown', this.onRightHold);
        document.addEventListener('rightup', this.onRightRelease);
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
        console.log("Right hold")
    }
    
    onRightRelease() {
        this.rightClickHold = false;
        console.log("Right release")
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