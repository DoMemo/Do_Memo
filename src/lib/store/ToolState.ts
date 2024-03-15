import { Tools } from "lib/enum/Tools";
import { Todo } from "lib/types/todo";
import { atom } from "recoil";

export const toolState = atom({
  key: "toolState",
  default: Tools.NONE as string,
});

