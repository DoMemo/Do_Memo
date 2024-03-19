import { CalendarService } from 'lib/service/CalendarService';
import { filteredScheduleSelector } from 'lib/store/calendarStore/filteredScheduleSelector';
import { scheduleState } from 'lib/store/calendarStore/scheduleState';
import { selectedDateState } from 'lib/store/calendarStore/selectedDateState';
import { Schedule } from 'lib/types/Schedule';
import React from 'react';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import ScheduleCard from './ScheduleCard';

const ScheduleWrapper = () => {
  const [scheduleList, setScheduleList] = useRecoilState(scheduleState);
  const selectedDate = useRecoilValue(selectedDateState);
  const filteredSchedule = useRecoilValue(filteredScheduleSelector);
  const getScheduleList = async () => {
    const result = (await CalendarService.getScheduleList()) as Schedule[];
    setScheduleList(() => {
      return [...result];
    });
  };

  useEffect(() => {
    getScheduleList();
  }, [scheduleList]);
  return (
    <div className="w-full p-2">
      <div>{selectedDate}</div>
      {scheduleList.map((schedule) => {
        return <ScheduleCard key={schedule.id} schedule={schedule} />;
      })}
    </div>
  );
};

export default ScheduleWrapper;
