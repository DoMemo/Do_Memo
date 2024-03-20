import { CalendarService } from 'lib/service/CalendarService';
import { scheduleState } from 'lib/store/calendarStore/scheduleState';
import { Schedule } from 'lib/types/Schedule';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import AddScheduleModal from '../schedule/AddScheduleModal';
import ScheduleWrapper from '../schedule/ScheduleWrapper';
import DateSelector from './DateSelector';

const CalendarContainer = () => {
  const [scheduleList, setScheduleList] = useRecoilState(scheduleState);

  const getScheduleList = async () => {
    const result = (await CalendarService.getScheduleList()) as Schedule[];
    setScheduleList(() => {
      return [...result];
    });
  };
  useEffect(() => {
    getScheduleList();
  }, []);
  return (
    <div className="relative">
      <DateSelector />
      <ScheduleWrapper />
      <AddScheduleModal />
    </div>
  );
};

export default CalendarContainer;
