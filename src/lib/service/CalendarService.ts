import { createObject, deleteObject, getObject } from 'lib/DB/indexedObject';
import { INDEXED_DB } from 'lib/enum/Indexed_DB';
import { CreateSchedule, Schedule } from 'lib/types/Schedule';

export class CalendarService {
  static async createSchedule(schedule: CreateSchedule) {
    return new Promise(async (resolve, reject) => {
      const store = await createObject(INDEXED_DB.CALENDAR_TODO);

      const request = store.add(schedule);
      request.onsuccess = async () => {
        const result = request.result;
        if (result) {
          const getSchedule = await this.getSchedule(result);

          // const orderList = this.getScheduleOrder();
          // orderList.push(result);
          // this.updateScheduleOrder(orderList);

          resolve(getSchedule);
        }
      };
      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  static async getSchedule(id: number | IDBValidKey) {
    return new Promise(async (resolve, reject) => {
      const store = await getObject(INDEXED_DB.CALENDAR_TODO);

      const request = store.get(id);
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  static async getScheduleList() {
    return new Promise(async (resolve, reject) => {
      const store = await getObject(INDEXED_DB.CALENDAR_TODO);
      const request = store.getAll();
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  static async updateSchedule(schedule: Schedule) {
    return new Promise(async (resolve, reject) => {
      const store = await createObject(INDEXED_DB.CALENDAR_TODO);
      const request = store.put(schedule);
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  static async deleteSchedule(id: string | number | IDBValidKey) {
    return new Promise(async (resolve, reject) => {
      const store = await deleteObject(INDEXED_DB.CALENDAR_TODO);
      const request = store.delete(id);
      request.onsuccess = (event) => {
        resolve(request.result);
      };
      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  // 내보내기 로직 schedule 을 Todo or memo 형식으로 todo/memo store에 보내는 로직 작성
}
