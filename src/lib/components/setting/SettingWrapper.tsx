import React, { useEffect, useState } from 'react'
import SettingItem from './SettingItem'
import ToggleButton from '../ui/button/ToggleButton'
import { SettingService } from 'lib/service/SettingService';
import { useRecoilState, useRecoilValue } from 'recoil';
import { darkState } from 'lib/store/setting/DarkState';
import { toolState } from 'lib/store/ToolState';
import { Tools } from 'lib/enum/Tools';

const SettingWrapper = () => {
  const [ currentDarkMode, setCurrentDarkMode ] = useRecoilState(darkState);
  const currentTool = useRecoilValue(toolState);

  useEffect(() => {
    setCurrentDarkMode(SettingService.getDarkMode());
  }, []);
  useEffect(() => {
    SettingService.updateDarkMode(currentDarkMode);
    if(!currentDarkMode) {
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#FFF');
    }
    if(currentDarkMode) {   
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', 'rgb(2, 6, 23)');
    }
  }, [currentDarkMode]);
  return (
    <div
      className='w-full bg-red flex flex-col pt-2 gap-2'
    >
      <div className={`${currentTool === Tools.SETTING && 'animate-slide-up-load-1th'}`}>
        <SettingItem title='폰트 사이즈'>
          준비중ㅋ
        </SettingItem>
      </div>
      <div className={`${currentTool === Tools.SETTING && 'animate-slide-up-load-2th'}`}>
        <SettingItem title='다크모드'>
          <ToggleButton 
            isActive={!currentDarkMode}
            setIsActive={setCurrentDarkMode}
          />
        </SettingItem>
      </div>
      <div className={`${currentTool === Tools.SETTING && 'animate-slide-up-load-3th'}`}>
        <SettingItem title='준비중'>
          준비중
        </SettingItem>
      </div>
    </div>
  )
}

export default SettingWrapper
