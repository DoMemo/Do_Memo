import CancelBackground from 'lib/components/background/CancelBackground';
import CommonSubmitButton from 'lib/components/ui/button/CommonSubmitButton';
import CommonInput from 'lib/components/ui/input/CommonInput';
import { Tools } from 'lib/enum/Tools';
import { TYPE } from 'lib/enum/Type';
import { CalendarService } from 'lib/service/CalendarService';
import { selectedDateState } from 'lib/store/calendarStore/selectedDateState';
import { darkState } from 'lib/store/setting/DarkState';
import { toolState } from 'lib/store/ToolState';
import { CreateSchedule, Schedule } from 'lib/types/Schedule';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

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

  const handleModalClose = () => {
    setActiveTool(Tools.NONE);
  };

  const addSchedule = async () => {
    const newSchedule: CreateSchedule = {
      title: title,
      text: content,
      color: undefined,
      type: TYPE.schedule,
      date: selectedDate,
      link: {
        type: TYPE.schedule,
        id: undefined,
      },
    };

    const result = (await CalendarService.createSchedule(newSchedule)) as Schedule;

    setTitle('');
    setContent('');
    handleModalClose();
  };

  useEffect(() => {
    if (activeTool === Tools.PEN) {
      setIsShow(true);
    } else setIsShow(false);
  }, [activeTool]);
  return (
    <div>
      {isShow && (
        <>
          <CancelBackground handleCancel={handleModalClose} />
          <div className="absolute top-3 left-[50%] translate-x-[-50%] p-4 bg-gray-300 z-40 rounded-2xl w-2/3 md:w-3/5 max-w-[650px]">
            <div className="text-lg font-semibold font-mono  text-gray-800 mb-2">Add Schedule</div>
            <div>
              <CommonInput value={title} setValue={setTitle} onChange={handleScheduleTitle} />
            </div>
            <div className="mb-2">
              <CommonInput value={content} setValue={setContent} onChange={handleScheduleContent} />
            </div>
            <CommonSubmitButton handleClick={addSchedule}></CommonSubmitButton>
          </div>
        </>
      )}
    </div>
  );
};

export default AddScheduleModal;
