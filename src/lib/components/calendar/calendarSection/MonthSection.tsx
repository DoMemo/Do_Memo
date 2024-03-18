import React, { useEffect } from 'react';
import { useState } from 'react';
import DaySection from './DaySection';

const MonthSection = ({ dayArray, currentMonth }: { dayArray: string[]; currentMonth: number }) => {
  const [days, setDays] = useState<string[]>([]);
  useEffect(() => {
    setDays(['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']);
  }, []);

  return (
    <div>
      <div className="flex">
        {days.map((day) => (
          <div className="w-[calc(100%/7)]">
            <div className="font-bold">{day}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 grid-rows-6 bg-gray-200 aspect-square">
        {dayArray.map((day, index) => {
          const [year, month, date] = day.split('-').map(Number);
          return <DaySection key={index} day={day} />;
        })}
      </div>
    </div>
  );
};

export default MonthSection;
