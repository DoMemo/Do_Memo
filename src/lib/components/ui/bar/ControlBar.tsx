import React from 'react';
import CircleButton from 'lib/components/ui/button/CircleButton';
import SettingImg from 'assets/images/setting.png'
import ToolBox from 'lib/components/tool/ToolBox';
import { Tools } from 'lib/enum/Tools';
import SettingBar from './SettingBar';
import { toolState } from 'lib/store/ToolState';
import { useRecoilState } from 'recoil';
import PaletteBar from './PaletteBar';

const ControlBar = () => {
  const [ currentTool, setCurrentTool ] = useRecoilState(toolState);

  const toggleSettingBar = () => {
    if(currentTool === Tools.SETTING) {
      setCurrentTool(Tools.NONE);
    } else {
      setCurrentTool(Tools.SETTING);
    }
  }
  return (
    <div className='relative flex flex-row justify-between items-center w-full h-[60px] bg-white z-40'>
      <PaletteBar />
      <div className='w-full h-full flex flex-row justify-center items-center'>
        <ToolBox />
      </div>
      <SettingBar />
      <div className='w-[48px] h-full flex items-center px-1 absolute top-0 right-1'>
        <button className={`w-[40px] h-[40px] bg-white rounded-full flex justify-center items-center duration-300 ${currentTool === Tools.SETTING && 'rotate-180'}`} 
          onClick={toggleSettingBar}
        >
          <img src={SettingImg} alt="tool" />
        </button>
      </div>
    </div>
  )
}

export default ControlBar
