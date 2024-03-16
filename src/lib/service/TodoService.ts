import { createObject, deleteObject, getObject } from "lib/DB/indexedObject";
import { CreateTodo, Todo } from "lib/types/todo";

export class TodoService {

  static async createTodo(todo: CreateTodo) {
    return new Promise( async (resolve, reject) => {
      const store = await createObject();

      const request = store.add(todo);
      request.onsuccess = async () => {
        const result = request.result;
        if(result) {
          const getTodo = await this.getTodo(result) as Todo;

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
      const store = await getObject();
      
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
      const store = await getObject();

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
      const store = await createObject();

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
      const store = await deleteObject();

      const request = store.delete(id);
      request.onsuccess = (event) => {
        resolve(request.result);
        // undefined
      };
      request.onerror = () => {
        reject(request.error);
      };
    });
  }
}
