import { currentScheduleSelector } from 'lib/store/calendarStore/currentScheduleSelector'
import { Schedule } from 'lib/types/Schedule';
import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import ScheduleCard from './ScheduleCard';
import { CalendarService } from 'lib/service/CalendarService';
import { scheduleState } from 'lib/store/calendarStore/scheduleState';

const TodaySchedule = () => {
  const currentSchedule = useRecoilValue(currentScheduleSelector);
  const [ scheduleList, setScheduleList ] = useRecoilState(scheduleState);

  const getSchedule = async () => {
    const result = await CalendarService.getScheduleList() as Schedule[];
    setScheduleList(result);  
  }

  useEffect(() => {
    getSchedule();
  }, []);
  return (
    <div className='w-full flex flex-col gap-2'>
      {
        currentSchedule.length === 0 ?
        <div className='w-full py-2 text-gray-600'>일정이 없습니다.</div> :
        currentSchedule.map((schedule: Schedule) => {
          return (
            <ScheduleCard key={schedule.id} schedule={schedule} />
          )
        })
      }
    </div>
  )
}

export default TodaySchedule
