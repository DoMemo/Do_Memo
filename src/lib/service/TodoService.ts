import { createObject, deleteObject, getObject } from "lib/DB/indexedObject";
import { INDEXED_DB } from "lib/enum/Indexed_DB";
import { CreateTodo, Todo } from "lib/types/todo";

export class TodoService {

  static async createTodo(todo: CreateTodo) {
    return new Promise( async (resolve, reject) => {
      const store = await createObject(INDEXED_DB.TODO_LIST);

      const request = store.add(todo);
      request.onsuccess = async () => {
        const result = request.result;
        if(result) {
          const getTodo = await this.getTodo(result) as Todo;
          // dnd 순서를 위한 로직 시작
          const orderList = this.getTodoOrder();
          orderList.push(result);
          this.updateTodoOrder(orderList);
          // dnd 순서를 위한 로직 끝
          resolve(getTodo);
        }
      };
      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  static async getTodo(id: number | IDBValidKey) {
    return new Promise( async (resolve, reject) => {
      const store = await getObject(INDEXED_DB.TODO_LIST);
      
      const request = store.get(id);
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  static async getTodoList() {
    return new Promise( async (resolve, reject) => {
      const store = await getObject(INDEXED_DB.TODO_LIST);

      const request = store.getAll();
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  static async updateTodo(todo: Todo) {
    return new Promise( async (resolve, reject) => {
      const store = await createObject(INDEXED_DB.TODO_LIST);

      const request = store.put(todo);
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  static async deleteTodo(id: 
    string | 
    number | 
    IDBValidKey) {
    return new Promise( async (resolve, reject) => {
      const store = await deleteObject(INDEXED_DB.TODO_LIST);

      const request = store.delete(id);
      request.onsuccess = (event) => {
        const orderList = this.getTodoOrder();
        const index = orderList.indexOf(id);
        orderList.splice(index, 1);
        this.updateTodoOrder(orderList);
        resolve(request.result);
      };
      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  static updateTodoOrder(orderList: number[]) {
    localStorage.setItem(INDEXED_DB.TODO_LIST_INDEX, JSON.stringify(orderList));
  }

  static getTodoOrder() {
    const orderList = localStorage.getItem(INDEXED_DB.TODO_LIST_INDEX);
    if(orderList) {
      return JSON.parse(orderList);
    }
    return [];
  }
}
