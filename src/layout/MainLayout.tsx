import AppBar from 'lib/components/ui/bar/AppBar'
import ControlBar from 'lib/components/ui/bar/ControlBar'
import { darkState } from 'lib/store/setting/DarkState'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

const MainLayout = () => {
  const isDarkMode = useRecoilValue(darkState);
  return (
    <div className={`flex flex-col justify-between w-full h-screen relative ${isDarkMode ? "bg-slate-950 text-white" : "bg-white"}`}>
      <AppBar />
      <div className='relative w-full max-h-[calc(100%-110px)] min-h-[calc(100%-110px)] overscroll-hidden'>
      <Outlet />
      </div>
      <ControlBar />
    </div>
  )
}

export default MainLayout
