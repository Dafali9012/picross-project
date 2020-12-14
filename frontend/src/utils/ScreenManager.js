export default class ScreenManager {

    static init(stage) {
          this.stage = stage;
          this.screens = {}
    }

    static changeScreen(screen) {
        if(this.stage.children[0]) this.stage.removeChildAt(0);
        this.stage.addChild(this.screens[screen]);
    }

    static addNewScreen(name, screen){
        this.screens[name] = screen;
    }
}