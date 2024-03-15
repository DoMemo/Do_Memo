import React, { useState } from 'react';
import HamburgerButton from 'lib/components/ui/button/HamburgerButton';
import Logo from 'lib/components/ui/logo/Logo';
import SideBar from './SideBar';

const AppBar = () => {
  const [ isSideBarActive, setIsSideBarActive ] = useState(false);

  return (
    <div className='w-full h-[50px] flex flex-row justify-between items-center shadow p-2 relative z-50'>
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
