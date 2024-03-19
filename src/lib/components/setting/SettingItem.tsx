import { darkState } from 'lib/store/setting/DarkState';
import React from 'react'
import { useRecoilValue } from 'recoil';

const SettingItem = ({ title, children }: {
  title: string;
  children: React.ReactNode;
}) => {
  const isDarkMode = useRecoilValue(darkState);
  return (
    <div
      className={`w-full flex flex-row justify-between p-4 shadow-lg rounded-lg h-[60px] ${isDarkMode ? "bg-slate-900 text-white" : "bg-white"}`}
    >
      <span
        className='flex flex-row items-center justify-center font-bold'
      >{title}</span>
      <div
        className='flex flex-row items-center justify-center'
      >
        {children}
      </div>
    </div>
  )
}

export default SettingItem
