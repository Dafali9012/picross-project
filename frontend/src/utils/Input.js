export default class Input {
    constructor(){
        this.leftClickHold = false;
        this.rightClickHold = false;
    }
    onLeftHold() {
        this.leftClickHold = true;
    }
    
    onLeftRelease() {
        this.leftClickHold = false;
    }

    onRightHold() {
        this.rightClickHold = true;
    }
    
    onRightRelease() {
        this.rightClickHold = false;
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