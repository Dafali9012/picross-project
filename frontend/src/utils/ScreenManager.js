import BackgroundManager from "./BackgroundManager.js";

export default class ScreenManager {

    static init(screenContainer) {
          this.container = screenContainer;
          this.screens = {};
          this.visitedScreens = [];
    }

    static previousScreen() {
        this.visitedScreens.pop();
        BackgroundManager.previousColor();
        return this.changeScreen(this.visitedScreens.pop());
    }

    static changeScreen(screen) {
        this.visitedScreens.push(screen);
        if(this.container.children[0]) this.container.removeChildAt(0);
        this.container.addChild(this.screens[screen]);
        return this.screens[screen];
    }

    static addScreen(screen){
        this.screens[screen.constructor.name] = screen;
    }
}
