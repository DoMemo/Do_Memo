import { atom } from "recoil";

export const currentDateState = atom({
  key: 'currentDateState',
  default: new Date(),
})
