import React from 'react';
import CircleButton from 'lib/components/ui/button/CircleButton';
import SettingImg from 'assets/images/setting.png'
import ToolBox from 'lib/components/tool/ToolBox';
import { Tools } from 'lib/enum/Tools';
import SettingBar from './SettingBar';

const ControlBar = () => {
  return (
    <div className='relative flex flex-row justify-between items-center w-full h-[60px] bg-white z-40'>
      <div className='w-full h-full flex flex-row justify-center items-center'>
        <ToolBox />
      </div>
      <div className='w-[48px] h-full flex items-center px-1 absolute top-0 right-1'>
        <SettingBar />
        <CircleButton img={SettingImg} name={Tools.SETTING}/>
      </div>
    </div>
  )
}

export default ControlBar
