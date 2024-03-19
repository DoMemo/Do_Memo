import React, { useEffect, useRef, useState } from 'react'
import SettingItem from './SettingItem'
import ToggleButton from '../ui/button/ToggleButton'
import { SettingService } from 'lib/service/SettingService';
import { useRecoilState, useRecoilValue } from 'recoil';
import { darkState } from 'lib/store/setting/DarkState';
import { toolState } from 'lib/store/ToolState';
import { Tools } from 'lib/enum/Tools';
import detectSwipe from 'lib/util/detectSwipe';
import { FontSizeState } from 'lib/store/setting/FontState';

const SettingWrapper = () => {
  const [ currentDarkMode, setCurrentDarkMode ] = useRecoilState(darkState);
  const [ scrollY, setScrollY ] = useState(0);
  const [ currentTool, setCurrentTool ] = useRecoilState(toolState);
  const [ fontSize, setFontSize ] = useRecoilState(FontSizeState);
  const strongElement = useRef<HTMLElement>(null);
  const isDarkMode = useRecoilValue(darkState);
  
  const handleFontSize = (axis: string) => {
    if(axis === 'left' && fontSize > 9 ) {
      setFontSize((oldFontSize) => oldFontSize -= 1);
      SettingService.updateFontSize(fontSize - 1);
    } else if(axis === 'right' && fontSize < 28) {
      setFontSize((oldFontSize) => oldFontSize += 1);
      SettingService.updateFontSize(fontSize + 1);
    }
  } 

  const handleSwipe = (event: any) => {
    const swipeType = detectSwipe(event, scrollY, setScrollY);
    if(swipeType === 'down') {
      setCurrentTool(Tools.NONE);
    }
  }
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

  useEffect(() => {
    if(!strongElement || !strongElement.current) return;
    strongElement.current.style.fontSize = (fontSize + "px");
  }, [fontSize])
  return (
    <div
      className='w-full h-full bg-red flex flex-col pt-2 gap-2'
      onTouchStart={handleSwipe}
      onTouchEnd={handleSwipe}
      onMouseDown={handleSwipe}
      onMouseLeave={handleSwipe}
      onMouseUp={handleSwipe}
    >
      <div className={`${currentTool === Tools.SETTING && 'animate-slide-up-load-1th'}`}>
        <SettingItem title='폰트 사이즈'>
          <div
            className='flex flex-row gap-2 justify-between items-center w-[150px] h-[45px]'
          >
            <button className={`w-[35px] h-full rounded-lg ${!isDarkMode ? "text-white bg-slate-900" : " text-black bg-white"}`}
              onClick={() => handleFontSize('left')}
            >
              &#60;
            </button>
            <div className='w-[60px] h-full flex justify-center items-center'>
              <strong 
                ref={strongElement}
              >{fontSize}</strong>
              <span>px</span>
            </div>
            <button className={`w-[35px] h-full rounded-lg ${!isDarkMode ? "text-white bg-slate-900" : " text-black bg-white"}`}
              onClick={() => handleFontSize('right')}
            >
              &#62;
            </button>
          </div>
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
      {/* <div className={`${currentTool === Tools.SETTING && 'animate-slide-up-load-3th'}`}>
        <SettingItem title='준비중'>
          준비중
        </SettingItem>
      </div> */}
    </div>
  )
}

export default SettingWrapper
