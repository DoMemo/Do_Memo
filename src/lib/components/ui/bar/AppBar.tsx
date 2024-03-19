import React, { useEffect, useState } from 'react';
import HamburgerButton from 'lib/components/ui/button/HamburgerButton';
import Logo from 'lib/components/ui/logo/Logo';
import SideBar from './SideBar';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { darkState } from 'lib/store/setting/DarkState';

const AppBar = () => {
  const [ isSideBarActive, setIsSideBarActive ] = useState(false);
  const location = useLocation();
  const isDarkMode = useRecoilValue(darkState);

  useEffect(() => {
    setIsSideBarActive(false);
  }, [location]);

  return (
    <div className={`w-full h-[50px] flex flex-row justify-between items-center shadow p-2 pl-4 relative z-50 ${isDarkMode ? "bg-slate-950" : "bg-white"}`}>
      <h1 className='sr-only'>Do!</h1>
      <Logo />
      <div className='absolute top-[15px] right-[10px] z-50'>
        <HamburgerButton 
          isActive={isSideBarActive}
          setIsActive={setIsSideBarActive}
        />
      </div>
      <SideBar 
        direction='right'
        isActive={isSideBarActive}
      />
    </div>
  )
}

export default AppBar
