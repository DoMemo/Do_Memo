import { toolState } from 'lib/store/ToolState';
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil';

const CircleButton = ({ img, name, isShadow, onClickFn }: {
  img?: string;
  name?: string;
  isShadow?: boolean;
  onClickFn?: () => void;
}) => {
  const [ isActive, setIsActive ] = useState(false);
  const activeTool = useRecoilValue(toolState);

  useEffect(() => {
    if(activeTool === name) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [activeTool, name]);

  return (
    <button className={`w-[40px] h-[40px] bg-white rounded-full flex justify-center items-center duration-200 ${isShadow && 'shadow-[0_-3px_3px_0px_rgba(0,0,0,0.1)]'} ${isActive && 'translate-y-[-20px]'}`} 
      onClick={onClickFn}
    >
      <img src={img} alt="tool" />
    </button>
  )
}

export default CircleButton
