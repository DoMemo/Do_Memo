import { CalendarService } from 'lib/service/CalendarService';
import { scheduleState } from 'lib/store/calendarStore/scheduleState';
import { Schedule } from 'lib/types/Schedule';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import AddScheduleModal from '../schedule/AddScheduleModal';
import ScheduleWrapper from '../schedule/ScheduleWrapper';
import DateSelector from './DateSelector';

const CalendarContainer = () => {
  const [scheduleList, setScheduleList] = useRecoilState(scheduleState);
  const bodyContainer = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    if (bodyContainer.current) {
      setScrollY(bodyContainer.current.scrollTop);
    }
  };

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
    <div
      className={`relative w-full h-[calc(100vh-110px)] z-10 overflow-scroll scrollbar-hide 
        md:flex md:flex-row
      `}
      ref={bodyContainer}
      onScroll={handleScroll}
    >
      <div className='md:w-6/12'>
        <DateSelector />
      </div>
      <div className='md:w-6/12 md:overflow-scroll md:h-full scrollbar-hide'>
        <ScheduleWrapper />
      </div>
      <AddScheduleModal />
    </div>
  );
};

export default CalendarContainer;
