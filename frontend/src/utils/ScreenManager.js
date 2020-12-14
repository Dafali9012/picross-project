export default class ScreenManager {

    static init(stage) {
          this.stage = stage;
          this.screens = {};
          this.visitedScreens = [];
    }

    static previousScreen() {
        this.visitedScreens.pop();
        this.changeScreen(this.visitedScreens.pop());
    }

    static changeScreen(screen) {
        this.visitedScreens.push(screen);
        if(this.stage.children[0]) this.stage.removeChildAt(0);
        this.stage.addChild(this.screens[screen]);
        return this.screens[screen];
    }

    static addNewScreen(name, screen){
        this.screens[name] = screen;
    }
}