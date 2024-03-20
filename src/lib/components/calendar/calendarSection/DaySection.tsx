import { filteredScheduleSelector } from 'lib/store/calendarStore/filteredScheduleSelector';
import { scheduleState } from 'lib/store/calendarStore/scheduleState';
import { selectedDateState } from 'lib/store/calendarStore/selectedDateState';
import { Schedule } from 'lib/types/Schedule';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import DaySchedule from './DaySchedule';

const DaySection = ({ day, isPrevDay, isNextDay }: { day: string; isPrevDay: boolean; isNextDay: boolean }) => {
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
    <div
      className={`bg-white border-2 ${onToday ? 'border-sky-500' : ''} ${
        isPrevDay ? 'text-gray-400' : isNextDay ? 'text-gray-400' : 'text-gray-600'
      } cursor-pointer hover:border-sky-500 `}
      onClick={handleClick}
    >
      <div
        className={`inline-block rounded-full flex item-center justify-center text-[0.5rem] md:text-sm ${
          onToday ? 'text-white' : ''
        } ${onToday ? 'bg-blue-500' : ''} w-3 h-3 md:w-6 md:h-6 mt-1 ml-1 hover:bg-blue-300 items-center`}
      >
        {date}
      </div>
      <div className="flex flex-col items-center">
        {dayScheduleList.map((schedule) => (
          <DaySchedule schedule={schedule} key={schedule.id} />
        ))}
      </div>
    </div>
  );
};

export default DaySection;
