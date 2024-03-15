import AppBar from 'lib/components/ui/bar/AppBar'
import ControlBar from 'lib/components/ui/bar/ControlBar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className='flex flex-col justify-between w-full h-screen relative'>
      <AppBar />
      <div className='relative w-full max-h-[calc(100%-110px)] min-h-[calc(100%-110px)] overscroll-hidden'>
      <Outlet />
      </div>
      <ControlBar />
    </div>
  )
}

export default MainLayout
