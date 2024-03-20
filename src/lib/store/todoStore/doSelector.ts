import { selector } from "recoil";
import { todoState } from "./todoState";
import { Todo } from "lib/types/todo";
import { todoOrderState } from "./todoOrderState";

export const uncheckedTodoList = selector({
  key: 'uncheckedTodoList',
  get: ({get}) => {
    const todoList = get(todoState) as Todo[];
    const todoOrderList = get(todoOrderState);
    const tampList: Todo[] = [];
    console.log(todoList);
    todoOrderList.forEach((id) => {
      const index = todoList.findIndex((todo) => Number(todo.id) === id);
      if(index !== -1) {
        tampList.push(todoList[index]);
      }
    });
    return tampList;
  }
});
