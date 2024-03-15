export interface Todo {
  id: number | IDBValidKey | string,
  text: string,
  checked: boolean,
  color: string | undefined,
  type: string,
  isDone: boolean,
  date: string
}
export interface CreateTodo {
  text: string,
  checked: boolean,
  color: string | undefined,
  type: string,
  isDone: boolean,
  date: string
}
