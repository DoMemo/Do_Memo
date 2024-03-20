import ScheduleWrapper from 'lib/components/calendar/schedule/ScheduleWrapper';
import TodaySchedule from 'lib/components/calendar/schedule/TodaySchedule';
import TodoInputBox from 'lib/components/todo/TodoInputBox'
import TodoList from 'lib/components/todo/TodoList'
import { CalendarService } from 'lib/service/CalendarService';
import { activeTodayScheduleState } from 'lib/store/calendarStore/activeTodaySchedule';
import { darkState } from 'lib/store/setting/DarkState';
import { returnToday } from 'lib/util/formatDate';
import React, { useEffect, useRef, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';

const Home = () => {
  const [ isActiveTodaySchedule, setIsAcitveTodaySchedule ] = useRecoilState(activeTodayScheduleState);
  const isDarkMode = useRecoilValue(darkState);

  const bodyContainer = useRef<HTMLDivElement>(null);
  const [ scrollY, setScrollY ] = useState(0);

  const handleScroll = () => {
    if(bodyContainer.current) {
      setScrollY(bodyContainer.current.scrollTop);
    }
  }
  const getActiveToday = () => {
    const isActiveSchedule = CalendarService.getActiveToday();
    setIsAcitveTodaySchedule(isActiveSchedule);
  }
  const updateActiveToday = () => {
    if(isActiveTodaySchedule) {
      setIsAcitveTodaySchedule(false);
      CalendarService.updateActiveToday(false);
    } else {
      setIsAcitveTodaySchedule(true);
      CalendarService.updateActiveToday(true);
    }
  }
  useEffect(() => {
    getActiveToday();
  }, [])
  return (
    <div className={`w-full max-h-full relative`}>
      <TodoInputBox />
      <div 
        className={`relative w-full h-[calc(100vh-110px)] z-10 overflow-scroll scrollbar-hide
          md:flex lg:flex-row
        `}
        ref={bodyContainer} 
        onScroll={handleScroll}
      >
        <div className='md:w-5/12 md:h-full md:overflow-scroll scrollbar-hide'>
          <div className={`font-bold translate-y-[-1px] py-2 uppercase md:sticky md:top-0 md:z-40 ${isDarkMode ? "md:bg-slate-950" : "md:bg-white"}`}>
            <span>
              schedule
            </span>
            {
              isActiveTodaySchedule ?
              <button
                className='w-[30px] absolute top-[50%] right-2 translate-y-[-50%]'
                onClick={updateActiveToday}
              >
                &#8673;
              </button> :
              <button
                className='w-[30px] absolute top-[50%] right-2 translate-y-[-50%]'
                onClick={updateActiveToday}
              >
                &#8675;
            </button>
            }
          </div>
          {
            isActiveTodaySchedule &&
            <TodaySchedule />
          }
        </div>
        <div className='md:w-7/12 md:h-full md:overflow-scroll scrollbar-hide'>
          <div className={`font-bold translate-y-[-1px] py-1 md:sticky md:top-0 md:z-40 ${isDarkMode ? "md:bg-slate-950" : "md:bg-white"}`}>TODO</div>
          <TodoList scroll={scrollY} />
        </div>
      </div>
    </div>
  )
}

export default Home
