import { Todo } from "lib/types/todo";
import { atom } from "recoil";

export const todoState = atom({
  key: "todoState",
  default: [] as Todo[] | [],
});
