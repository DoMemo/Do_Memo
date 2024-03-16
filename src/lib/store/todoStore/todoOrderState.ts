import { atom } from "recoil";

export const todoOrderState = atom({
  key: "todoOrderState",
  default: [] as number[] | [],
})
