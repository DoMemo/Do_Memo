import CancelCircleButton from 'lib/components/ui/button/CancelCircleButton';
import { Tools } from 'lib/enum/Tools';
import { toolState } from 'lib/store/ToolState';
import React, { useEffect, useRef } from 'react'
import { useRecoilValue } from 'recoil';

const ScheduleCard = ({ schedule }: {
  schedule:{
    id: string;
    title: string;
    text: string;
    color: string | undefined;
    type: string;
    date: string;
    link: {
      type: string;
      id: string;
    }[] | undefined;
}}) => {
  const { id, title, text, color, type, date, link } = schedule;
  const currentTool = useRecoilValue(toolState);
  const textareaElement = useRef<HTMLTextAreaElement>(null);

  const isEraser = currentTool === Tools.ERASER;

  useEffect(() => {
    if(textareaElement.current) {
      textareaElement.current.style.height = 'auto';
      textareaElement.current.style.height = `${textareaElement.current.scrollHeight}px`;
    }
  }, [textareaElement, text])
  return (
    <div
      className={`w-full p-2`}
    >
      <div className={`relative w-full min-h-[100px] ${color} rounded-lg pt-1 p-2 shadow-lg`}>
        <div className='font-bold text-start text-lg'>
          <h3>{title}</h3>
        </div>
        <hr className='mb-1'/>
        <div className='w-full'>
          <textarea 
            ref={textareaElement}
            name="schedule" 
            id={id} 
            value={text}
            disabled
            className='w-full h-full bg-transparent border-none resize-none'  
          />
        </div>
        <div className={`absolute top-0 right-0 translate-x-[30%] translate-y-[-30%] ${!isEraser && "hidden"}`}>
          <CancelCircleButton 
            handleDelete={() => console.log('delete')}
          />
        </div>
      </div>
    </div>
  )
}

export default ScheduleCard
