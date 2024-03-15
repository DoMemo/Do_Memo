import { selector } from "recoil";
import { todoState } from "./todoState";

export const checkedTodoList = selector({
  key: 'checkedTodoList',
  get: ({get}) => {
    const todoList = get(todoState);
    return todoList.filter((todo) => todo.checked);
  }
});
