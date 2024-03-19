import { darkState } from 'lib/store/setting/DarkState';
import React from 'react'
import { useRecoilValue } from 'recoil';

const ToggleButton = ({ isActive, setIsActive }: {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const isDarkMode = useRecoilValue(darkState);
  const toggleActive = () => {
    setIsActive((active) => !active);
  }
  return (
    <div
      className={`relative w-[80px] h-[40px] ${isActive ? "bg-black" : "bg-white"} shadow-[0px_1px_10px_-1px_rgba(0,0,0,0.2)] rounded-full duration-200`}
      onClick={toggleActive}
    >
      <div
        className={`absolute top-[4px] left-[4px] w-[32px] h-[32px] ${isActive ? "bg-white" : "bg-black translate-x-[40px]"} rounded-full duration-500`}
      >
        <div className={`w-[32px] h-[32px] rounded-full relative flex flex-row justify-center items-center`}>
          <div className={`
            bg-yellow-500 w-[20px] h-[20px] rounded-full overflow-hidden
          `}>
            <div className={`absolute w-[15px] h-[15px] bg-slate-900 rounded-full ${!isDarkMode && "opacity-0"} duration-300`}>

            </div>
          </div>
          {/* <div className={`duration-500 w-[3px] h-[1px] bg-orange-500 absolute right-[2px] ${isDarkMode && 'opacity-0'}`}/>
          <div className={`duration-500 w-[3px] h-[1px] bg-orange-500 absolute left-[2px] ${isDarkMode && 'opacity-0'}`}/>
          <div className={`duration-500 w-[3px] h-[1px] bg-orange-500 absolute top-[2px] rotate-90 ${isDarkMode && 'opacity-0'}`}/>
          <div className={`duration-500 w-[3px] h-[1px] bg-orange-500 absolute bottom-[2px] rotate-90 ${isDarkMode && 'opacity-0'}`}/>
          <div className={`duration-500 w-[3px] h-[1px] bg-orange-500 absolute top-[6px] left-[6px] rotate-45 ${isDarkMode && 'opacity-0'}`}/>
          <div className={`duration-500 w-[3px] h-[1px] bg-orange-500 absolute top-[6px] right-[6px] rotate-[-45deg] ${isDarkMode && 'opacity-0'}`}/>
          <div className={`duration-500 w-[3px] h-[1px] bg-orange-500 absolute bottom-[6px] left-[6px] rotate-[-45deg] ${isDarkMode && 'opacity-0'}`}/>
          <div className={`duration-500 w-[3px] h-[1px] bg-orange-500 absolute bottom-[6px] right-[6px] rotate-45 ${isDarkMode && 'opacity-0'}`}/> */}
        </div>
      </div>
    </div>
  )
}

export default ToggleButton
