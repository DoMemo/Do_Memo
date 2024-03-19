import { createObject } from "lib/DB/indexedObject";
import { DarkMode } from "lib/enum/DarkMode";
import { FontSize } from "lib/enum/FontSize";

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

  static getFontSize() {
    const fontSize = localStorage.getItem(FontSize.title);
    if(fontSize) {
      return JSON.parse(fontSize);
    }
    return 13;
  }

  static updateFontSize(size: number) {
    localStorage.setItem(FontSize.title, JSON.stringify(size));
  }
}
