export default class BackgroundManager {

    static init(stage) {
          this.stage = stage;
          this.colors = {};
          this.visitedColors = [];
    }

    static previousColor() {
        this.visitedColors.pop();
        this.changeColor(this.visitedColors.pop());
    }

    static changeColor(color) {
        this.visitedColors.push(color);
        this.stage.children[0].tint = this.colors[color];
    }

    static addColor(hex, color){
        this.colors[color] = hex;
    }
}
