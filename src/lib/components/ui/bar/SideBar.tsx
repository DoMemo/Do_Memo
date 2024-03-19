import { Tools } from 'lib/enum/Tools';
import { toolState } from 'lib/store/ToolState';
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import SideBarLinks from './SideBarLinks';
import { darkState } from 'lib/store/setting/DarkState';

const SideBar = ({direction, isActive}: {
  direction: string;
  isActive: boolean;
}) => {
  // 1. set State
  const [ mounted, setMounted ] = useState(false);
  const [ currentTool, setCurrentTool ] = useRecoilState(toolState);
  const isDarkMode = useRecoilValue(darkState);
  
  // 2. 선언형 함수들
  // 예시로 렌더에 영향을 주거나 state를 변경하는 함수들 또는 Service이용하는 함수

  // 3. useEffect 무조건 맨 마지막
  useEffect(() => {
    if(isActive) {
      setCurrentTool(Tools.NONE);
      setMounted(true);
    } else {
      setTimeout(() => {
        setMounted(false);
      }, 180);
    }
  }, [isActive] );
  
  // return 
  return (
    <>
      {
        mounted && 
          <div className={`w-8/12 h-screen ${isDarkMode ? "bg-slate-900" :"bg-white"} shadow-lg absolute top-0 ${returnPathStyle(direction)} ${isActive ? "animate-slide-left" : "animate-slide-right"} z-40`}>
            <div className='w-full h-[60px]'></div>
            <SideBarLinks />
          </div>
      }
    </>
  )
}

// 4. helper function
function returnPathStyle(direction: string) {
  switch (direction) {
    case 'left':
      return 'left-0'
    case 'right':
      return 'right-0'
    default:
      return 'left-0'
  }
}

export default SideBar
