export interface Todo {
  id: number | IDBValidKey | string,
  text: string,
  checked: boolean,
  color: string | undefined,
  prevItemId: string | IDBValidKey | number | undefined,
  type: string,
  isDone: boolean,
  date: string
}
export interface CreateTodo {
  text: string,
  checked: boolean,
  color: string | undefined,
  prevItemId: string | IDBValidKey | number | undefined,
  type: string,
  isDone: boolean,
  date: string
}
