import { Tools } from 'lib/enum/Tools'
import { toolState } from 'lib/store/ToolState'
import { darkState } from 'lib/store/setting/DarkState'
import React from 'react'
import { useRecoilValue } from 'recoil'

const commonStyle = 'absolute left-0 w-full h-[1px] rounded-full duration-400 transition-all'

const SettingButton = ({ onClick }: {
  onClick: () => void
}) => {
  const isDarkMode = useRecoilValue(darkState);
  const currentTool = useRecoilValue(toolState);

  return (
    <div className='relative w-[25px] h-[17px] duration-400 translate-y-[-5px]'
      onClick={onClick}
    >
      <div className={`${commonStyle} ${isDarkMode ? 'bg-white' : 'bg-black'} top-0`}>
        <div className={`relative ${commonStyle}`}>
          <div className={`absolute w-[7px] h-[7px] border border-black rounded-full ${isDarkMode ? 'bg-slate-950 border-white' : "bg-white border-black"} ${currentTool === Tools.SETTING ? "left-[3px]" : "left-[10px]"} top-[-3px] duration-300 ease-[cubic-bezier(0, 1.75, 0.81, -0.31)]`}/>
        </div>
      </div>
      <div className={`${commonStyle} ${isDarkMode ? 'bg-white' : 'bg-black'} top-[8px]`}>
        <div className={`relative ${commonStyle}`}>
          <div className={`absolute w-[7px] h-[7px] border border-black rounded-full ${isDarkMode ? 'bg-slate-950 border-white' : "bg-white border-black"} ${currentTool === Tools.SETTING ? "left-[15px]" : "left-[3px]"} top-[-3px] duration-[1s] ease-[cubic-bezier(0.54, -0.24, 0.27, 2.21)]`}/>
        </div></div>
      <div className={`${commonStyle} ${isDarkMode ? 'bg-white' : 'bg-black'} bottom-0`}>
        <div className={`relative ${commonStyle}`}>
          <div className={`absolute w-[7px] h-[7px] border rounded-full ${isDarkMode ? 'bg-slate-950 border-white' : "bg-white border-black"} ${currentTool === Tools.SETTING ? "left-[7px]" : "left-[14px]"} top-[-3px] duration-500 ease-[cubic-bezier(0.95,0.05,0.795,0.035)]`}/>
        </div></div>
    </div>
  )
}

export default SettingButton
