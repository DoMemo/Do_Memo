import React from 'react';
import DaySection from './DaySection';

const MonthSection = ({ dayArray }: { dayArray: string[] }) => {
  return (
    <div className="grid grid-cols-7 grid-rows-6 gap-4 bg-gray-200 aspect-square">
      {dayArray.map((day, index) => (
        <DaySection key={index} day={day} />
      ))}
    </div>
  );
};

export default MonthSection;
