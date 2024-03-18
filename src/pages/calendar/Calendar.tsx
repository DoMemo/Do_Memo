import DateSelector from 'lib/components/calendar/calendarSection/DateSelector';
import ScheduleWrapper from 'lib/components/calendar/schedule/ScheduleWrapper';
import React from 'react';

const Calendar = () => {
  return (
    <div className="relative">
      <DateSelector />
      <ScheduleWrapper />
    </div>
  );
};

export default Calendar;
