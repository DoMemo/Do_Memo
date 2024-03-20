import { CalendarService } from 'lib/service/CalendarService';
import { filteredScheduleSelector } from 'lib/store/calendarStore/filteredScheduleSelector';
import { scheduleState } from 'lib/store/calendarStore/scheduleState';
import { selectedDateState } from 'lib/store/calendarStore/selectedDateState';
import { Schedule } from 'lib/types/Schedule';
import React from 'react';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import ScheduleCard from './ScheduleCard';

const ScheduleWrapper = () => {
  const selectedDate = useRecoilValue(selectedDateState);
  const [scheduleList, setScheduleList] = useRecoilState(scheduleState);
  const filteredSchedule = useRecoilValue(filteredScheduleSelector);

  //ScheduleList가 업데이트 될때 마다 페이지 랜더 후 filteredSchedule가져오기
  useEffect(() => {
    const getScheduleList = async () => {
      const result = (await CalendarService.getScheduleList()) as Schedule[];
      setScheduleList(result);
    };
    getScheduleList();
  }, [scheduleList]);

  return (
    <div className="w-full p-2">
      <div>{selectedDate}</div>
      {filteredSchedule.map((schedule) => {
        return <ScheduleCard key={schedule.id} schedule={schedule} />;
      })}
    </div>
  );
};

export default ScheduleWrapper;
