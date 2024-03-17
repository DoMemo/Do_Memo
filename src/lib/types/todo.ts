import { PICKER_COLOR } from "lib/enum/PickerColor"

export interface Todo {
  id: string,
  title: string | undefined,
  text: string,
  checked: boolean,
  color: PICKER_COLOR | undefined,
  prevItemId: string | IDBValidKey | number | undefined,
  type: string,
  isDone: boolean,
  date: string
}
export interface CreateTodo {
  text: string,
  title: string | undefined,
  checked: boolean,
  color: PICKER_COLOR | undefined,
  prevItemId: string | IDBValidKey | number | undefined,
  type: string,
  isDone: boolean,
  date: string
}
