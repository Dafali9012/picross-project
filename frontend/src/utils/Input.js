export default class Input {

    static init(stage){
        this.hold = false;
        this.delete = false;
        this.leftClick = true;

        document.addEventListener("contextmenu", e => {e.preventDefault();});

        stage.interactive = true;

        stage.on('mousedown', ()=>{
            this.hold = true;
            this.leftClick = true;
        });
        stage.on('mouseup', ()=>{
            this.hold = false;
            this.delete = false;
        });
        stage.on('rightdown', ()=>{
            this.hold = true;
            this.leftClick = false;
        });
        stage.on('rightup', ()=>{
            this.hold = false;
            this.delete = false;
        });
    }
}
