import React, { useEffect } from 'react';
import { useState } from 'react';
import DaySection from './DaySection';

const MonthSection = ({
  dayArray,
  currentMonth,
  prevDays,
  nextDays,
}: {
  dayArray: string[];
  currentMonth: number;
  prevDays: number;
  nextDays: number;
}) => {
  const [days, setDays] = useState<string[]>([]);
  useEffect(() => {
    setDays(['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']);
  }, []);

  return (
    <div>
      <div className="flex">
        {days.map((day, index) => (
          <div className="w-[calc(100%/7)]" key={index}>
            <div className="text-sm font-bold text-gray-600">{day}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 grid-rows-6 bg-gray-200 aspect-square">
        {dayArray.map((day, index) => {
          const [year, month, date] = day.split('-').map(Number);
          const isPrevDay = index < prevDays;
          const isNextDay = index >= dayArray.length - nextDays;
          return <DaySection key={index} day={day} isPrevDay={isPrevDay} isNextDay={isNextDay} />;
        })}
      </div>
    </div>
  );
};

export default MonthSection;
