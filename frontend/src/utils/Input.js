export default class Input {
    constructor(stage) {
        document.addEventListener("contextmenu", e => {
            e.preventDefault();
        });
        stage.interactive = true;
        stage.on("click", this.leftClick.bind(this));
        stage.on("rightclick", this.rightClick.bind(this));
    }

    leftClick() {
        console.log("leftclick");
    }

    rightClick() {
        console.log("rightclick");
    }
}