import DateSelector from 'lib/components/calendar/calendarSection/DateSelector';
import AddScheduleModal from 'lib/components/calendar/schedule/AddScheduleModal';
import ScheduleWrapper from 'lib/components/calendar/schedule/ScheduleWrapper';
import React from 'react';

const Calendar = () => {
  return (
    <div className="relative">
      <DateSelector />
      <ScheduleWrapper />
      <AddScheduleModal />
    </div>
  );
};

export default Calendar;
