import { selector } from "recoil";
import { scheduleState } from "./scheduleState";
import { currentDateState } from "./currentDateState";
import { TodoService } from "lib/service/TodoService";

export const filteredScheduleSelector = selector({
  key: 'filteredScheduleSelector',
  get: async ({get}) => {
    const schedule = get(scheduleState);
    const currentDate = get(currentDateState);
  
    return schedule
  }
})
