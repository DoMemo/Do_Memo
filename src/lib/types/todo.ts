import { PICKER_COLOR } from "lib/enum/PickerColor"

export interface Todo {
  id: string,
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
  checked: boolean,
  color: PICKER_COLOR | undefined,
  prevItemId: string | IDBValidKey | number | undefined,
  type: string,
  isDone: boolean,
  date: string
}
