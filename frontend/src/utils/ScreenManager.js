export default class ScreenManager {

    static init(stage) {
          this.stage = stage;
          this.screens = {};
          this.visitedScreens = [];
    }

    static previousScreen() {
        this.visitedScreens.pop();
        return this.changeScreen(this.visitedScreens.pop());
    }

    static changeScreen(screen) {
        this.visitedScreens.push(screen);
        if(this.stage.children[1]) this.stage.removeChildAt(1);
        this.stage.addChild(this.screens[screen]);
        return this.screens[screen];
    }

    static addScreen(screen){
        this.screens[screen.constructor.name] = screen;
    }
}
