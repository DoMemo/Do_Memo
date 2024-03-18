import SettingWrapper from 'lib/components/setting/SettingWrapper';
import { Tools } from 'lib/enum/Tools';
import { toolState } from 'lib/store/ToolState';
import React from 'react'
import { useRecoilValue } from 'recoil';

const SettingBar = () => {
  const currentTool = useRecoilValue(toolState);

  const isActive = () => {
    return currentTool === Tools.SETTING;
  }

  return (
    <div className={`absolute bottom-0 right-0 w-full h-[calc(100vh-50px)] p-2 shadow-[0_-2px_2px_0px_rgba(0,0,0,0.1)] ${isActive() ? "" : "translate-y-[100%]"} duration-300 backdrop-blur`}>
      <SettingWrapper />
    </div>
  )
}

export default SettingBar
