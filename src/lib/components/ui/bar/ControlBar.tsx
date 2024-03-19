import React from 'react';
import ToolBox from 'lib/components/tool/ToolBox';
import { Tools } from 'lib/enum/Tools';
import SettingBar from './SettingBar';
import { toolState } from 'lib/store/ToolState';
import { useRecoilState, useRecoilValue } from 'recoil';
import PaletteBar from './PaletteBar';
import { darkState } from 'lib/store/setting/DarkState';
import SettingButton from 'lib/components/ui/button/SettingButton';

const ControlBar = () => {
  const [ currentTool, setCurrentTool ] = useRecoilState(toolState);
  const isDarkMode = useRecoilValue(darkState);

  const toggleSettingBar = () => {
    if(currentTool === Tools.SETTING) {
      setCurrentTool(Tools.NONE);
    } else {
      setCurrentTool(Tools.SETTING);
    }
  }
  return (
    <div className={`relative ${isDarkMode ? "bg-slate-950 text-white" : "bg-white"} flex flex-row justify-between items-center w-full h-[68px]  z-40`}>
      <PaletteBar />
      <div className='w-full h-full flex flex-row justify-center items-center'>
        <ToolBox />
      </div>
      <SettingBar />
      <div className='w-[48px] h-full flex items-center px-1 absolute top-0 right-0'
        onClick={toggleSettingBar}
      >
        <SettingButton
          onClick={toggleSettingBar}
        />
      </div>
    </div>
  )
}

export default ControlBar
