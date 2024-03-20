import { filteredScheduleSelector } from 'lib/store/calendarStore/filteredScheduleSelector';
import { scheduleState } from 'lib/store/calendarStore/scheduleState';
import { selectedDateState } from 'lib/store/calendarStore/selectedDateState';
import { Schedule } from 'lib/types/Schedule';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import DaySchedule from './DaySchedule';

const DaySection = ({ day }: { day: string }) => {
  const [date, setDate] = useState<string>(day);
  const selectedDate = useRecoilValue(selectedDateState);
  const [onToday, setOnToday] = useState<boolean>(selectedDate === day);
  const setSelectedDate = useSetRecoilState(selectedDateState);
  const scheduleList = useRecoilValue<Schedule[]>(scheduleState);

  const dayScheduleList = scheduleList.filter((schedule) => schedule.date === day);

  const handleClick = () => {
    setSelectedDate(day);
  };
  useEffect(() => {
    setDate(day.slice(-2));
    setOnToday(selectedDate === day);
  }, [day, selectedDate]);

  return (
    <div className={`bg-white border-2 ${onToday ? 'border-black' : ''}`} onClick={handleClick}>
      {date}
      {dayScheduleList.map((schedule) => (
        <DaySchedule schedule={schedule} key={schedule.id} />
      ))}
    </div>
  );
};

export default DaySection;
