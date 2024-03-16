import { selector } from "recoil";
import { todoState } from "./todoState";
import { Todo } from "lib/types/todo";

export const checkedTodoList = selector({
  key: 'checkedTodoList',
  get: ({get}) => {
    const todoList = get(todoState) as Todo[];
    return todoList.filter((todo) => todo.checked);
  }
});
