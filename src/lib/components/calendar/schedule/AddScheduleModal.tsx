import { Tools } from 'lib/enum/Tools';
import { TYPE } from 'lib/enum/Type';
import { CalendarService } from 'lib/service/CalendarService';
import { selectedDateState } from 'lib/store/calendarStore/selectedDateState';
import { toolState } from 'lib/store/ToolState';
import { CreateSchedule, Schedule } from 'lib/types/Schedule';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

const AddScheduleModal = () => {
  const [activeTool, setActiveTool] = useRecoilState(toolState);
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);
  const [isShow, setIsShow] = useState(false);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const isActive = () => {
    return activeTool === Tools.PEN;
  };

  const handleScheduleTitle = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(event.target.value);
  };

  const handleScheduleContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const addSchedule = async () => {
    const newSchedule: CreateSchedule = {
      title: title,
      text: content,
      color: undefined,
      type: TYPE.schedule,
      date: selectedDate,
      link: [],
    };

    const result = (await CalendarService.createSchedule(newSchedule)) as Schedule;

    setTitle('');
    setContent('');
  };

  useEffect(() => {
    if (activeTool === Tools.PEN) {
      setIsShow(true);
    } else setIsShow(false);
  }, [activeTool]);
  return (
    <div>
      {isShow && (
        <div className="absolute top-0 left-1/4 p-4 bg-gray-400">
          <div>
            <h2>일정 추가</h2>
          </div>
          <div>
            <textarea value={title} onChange={handleScheduleTitle} />
          </div>
          <div>
            <textarea value={content} onChange={handleScheduleContent} />
          </div>
          <button onClick={addSchedule}>일정 추가!</button>
        </div>
      )}
    </div>
  );
};

export default AddScheduleModal;
