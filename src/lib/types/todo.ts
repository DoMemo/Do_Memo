import { PICKER_COLOR } from 'lib/enum/PickerColor';

export interface Todo {
  id: string;
  title: string | undefined;
  text: string;
  checked: boolean;
  color: PICKER_COLOR | undefined;
  prevItemId: string | IDBValidKey | number | undefined;
  type: string;
  isDone: boolean;
  date: string;
  link: {
    type: string;
    id: string | undefined;
  };
  createAt: string;
  updateAt: string;
}
export interface CreateTodo {
  text: string;
  title: string | undefined;
  checked: boolean;
  color: PICKER_COLOR | undefined;
  prevItemId: string | IDBValidKey | number | undefined;
  type: string;
  isDone: boolean;
  date: string;
  link: {
    type: string;
    id: string | undefined;
  };
  createAt: string;
  updateAt: string;
}
