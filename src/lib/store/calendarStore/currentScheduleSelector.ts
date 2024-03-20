import { selector } from "recoil";
import { scheduleState } from "./scheduleState";
import { returnToday } from "lib/util/formatDate";
import { Schedule } from "lib/types/Schedule";

export const currentScheduleSelector = selector({
  key: 'currentScheduleSelector',
  get: ({ get }) => {
    const schedule = get(scheduleState);
    const today = returnToday();

    const filteredScheduleList = schedule.filter((item: Schedule) => {
      return today === item.date;
    });
    
    return filteredScheduleList
  }
})
