import { selector } from 'recoil';
import { scheduleState } from './scheduleState';
import { currentDateState } from './currentDateState';
import { TodoService } from 'lib/service/TodoService';
import { selectedDateState } from './selectedDateState';
import { Schedule } from 'lib/types/Schedule';

export const filteredScheduleSelector = selector({
  key: 'filteredScheduleSelector',
  get: ({ get }) => {
    const schedule = get(scheduleState);
    const selectedDate = get(selectedDateState);

    const filteredScheduleList = schedule.filter((item: Schedule) => item.date === selectedDate);
    return filteredScheduleList;
  },
});
