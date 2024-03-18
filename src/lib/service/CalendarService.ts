import { createObject } from 'lib/DB/indexedObject';
import { INDEXED_DB } from 'lib/enum/Indexed_DB';
import { CreateSchedule, Schedule } from 'lib/types/Schedule';

export class CalendarService {
  static async createSchedule(todo: CreateSchedule) {
    return new Promise(async (resolve, reject) => {
      const store = await createObject(INDEXED_DB.CALENDAR_TODO);

      const request = store.add(todo);
      request.onsuccess = async () => {
        const result = request.result;
        if (result) {
          const getSchedule = await this.getSchedule(result);

          // dnd 추가시 적용
          // const orderList = this.getScheduleOrder();
          // orderList.push(result);
          // this.updateScheduleOrder(orderList);

          resolve(getSchedule);
        }
      };
    });
  }

  static async getSchedule(id: number | IDBValidKey) {}

  static async getScheduleList() {}

  static async updateSchedule(todo: Schedule) {}

  static async deleteSchedule(id: string | number | IDBValidKey) {}

  static async updateScheduleOrder(orderList: number[]) {}

  static async getScheduleOrder() {}
}
