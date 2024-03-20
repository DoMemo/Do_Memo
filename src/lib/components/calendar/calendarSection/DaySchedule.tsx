import { Schedule } from 'lib/types/Schedule';
import React from 'react';

const DaySchedule = ({ schedule }: { schedule: Schedule }) => {
  return (
    <div
      className={`text-[0.3rem] md:text-[0.5rem] ${
        schedule.color ? schedule.color : ''
      } w-4/5 rounded mt-[0.05rem] md:mt-1 py-[0.05rem] border ${schedule.color ? schedule.color : 'border-gray-400'}`}
    >
      <h6>{schedule.title}</h6>
    </div>
  );
};

export default DaySchedule;
