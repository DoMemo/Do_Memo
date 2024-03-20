import { Schedule } from 'lib/types/Schedule';
import React from 'react';

const DaySchedule = ({ schedule }: { schedule: Schedule }) => {
  return (
    <div className={`text-[0.5rem] ${schedule.color ? schedule.color : ''}`}>
      <h6>{schedule.title}</h6>
    </div>
  );
};

export default DaySchedule;
