import { createObject } from "lib/DB/indexedObject";
import { DarkMode } from "lib/enum/DarkMode";

export class SettingService {

  static getDarkMode() {
    const darkMode = localStorage.getItem(DarkMode.title);
    if(darkMode){
      return JSON.parse(darkMode);
    };

    return false;
  }

  static updateDarkMode(isDarkMode: boolean) {
    localStorage.setItem(DarkMode.title, JSON.stringify(isDarkMode));
  }
}
