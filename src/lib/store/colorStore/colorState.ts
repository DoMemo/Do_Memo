import { PICKER_COLOR } from "lib/enum/PickerColor";
import { atom } from "recoil";

export const colorState = atom({
  key: 'colorState',
  default: {
    pickedColor: PICKER_COLOR.red
  }
})
