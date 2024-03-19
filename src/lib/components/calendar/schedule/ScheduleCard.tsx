import CancelCircleButton from 'lib/components/ui/button/CancelCircleButton';
import { Tools } from 'lib/enum/Tools';
import { CalendarService } from 'lib/service/CalendarService';
import { scheduleState } from 'lib/store/calendarStore/scheduleState';
import { colorState } from 'lib/store/colorStore/colorState';
import { toolState } from 'lib/store/ToolState';
import { Schedule } from 'lib/types/Schedule';
import React, { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

const ScheduleCard = ({ schedule }: { schedule: Schedule }) => {
  const { id, title, text, color, type, date, link } = schedule;
  const currentTool = useRecoilValue(toolState);
  const currentColor = useRecoilValue(colorState);
  const textareaElement = useRef<HTMLTextAreaElement>(null);
  const [scheduleList, setScheduleList] = useRecoilState(scheduleState);

  const isEraser = currentTool === Tools.ERASER;

  // 일정 삭제 함수
  const handleDelete = async () => {
    try {
      await CalendarService.deleteSchedule(id);
    } catch (error) {
      console.log(error);
    }
  };

  // 일정 색상 변경 함수
  const handleChangeColor = async () => {
    if (currentTool !== Tools.HIGHLIGHTER) return;

    const isSameColor = color === currentColor.pickedColor;

    await CalendarService.updateSchedule({
      ...schedule,
      color: isSameColor ? undefined : currentColor.pickedColor,
    });

    const newList = (await CalendarService.getScheduleList()) as Schedule[];

    setScheduleList([...newList]);
  };

  useEffect(() => {
    if (textareaElement.current) {
      textareaElement.current.style.height = 'auto';
      textareaElement.current.style.height = `${textareaElement.current.scrollHeight}px`;
    }
  }, [textareaElement, text]);
  return (
    <div className={`w-full p-2`}>
      <div
        className={`relative w-full min-h-[100px] ${color} rounded-lg pt-1 p-2 shadow-lg`}
        onClick={handleChangeColor}
      >
        <div className="font-bold text-start text-lg">
          <h3>{title}</h3>
        </div>
        <hr className="mb-1" />
        <div className="w-full relative">
          <div className="w-full h-full absolute t-0"></div>
          <textarea
            ref={textareaElement}
            name="schedule"
            id={id}
            value={text}
            disabled
            className="w-full h-full bg-transparent border-none resize-none"
          />
        </div>
        <div className={`absolute top-0 right-0 translate-x-[30%] translate-y-[-30%] ${!isEraser && 'hidden'}`}>
          <CancelCircleButton handleDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
};

export default ScheduleCard;
