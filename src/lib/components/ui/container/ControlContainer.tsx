import { darkState } from 'lib/store/setting/DarkState';
import React from 'react'
import { useRecoilValue } from 'recoil';

const ControlContainer = ({ isShadow, children }: {
  isShadow?: boolean;
  children?: React.ReactNode;
}) => {
  const isDarkMode = useRecoilValue(darkState);
  return (
    <div className={`absolute top-0 left-0 flex flex-row pb-2 gap-2 justify-center items-center w-full h-full ${isDarkMode ? "bg-slate-950 text-white" : "bg-white"} ${isShadow && 'shadow-[0_-2px_30px_1px_rgba(0,0,0,0.1)]'} rounded-tr-3xl rounded-tl-3xl`}>
      {children}
    </div>
  )
}

export default ControlContainer
