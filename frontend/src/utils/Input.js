export default class Input {

    static init(stage){
        this.hold = false;
        this.operation = "";

        document.addEventListener("contextmenu", e => {e.preventDefault();});

        stage.interactive = true;

        stage.on('pointerdown', this.onHold.bind(this));
        stage.on('pointerup', this.onRelease.bind(this));
    }

    static onHold() {
        this.hold = true;
    }
    
    static onRelease() {
        this.hold = false;
    }
}