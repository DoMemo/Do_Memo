import React from 'react'

const SettingItem = ({ title, children }: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className='w-full flex flex-row justify-between p-2 shadow-lg rounded-lg h-[50px] bg-white'
    >
      <span
        className='flex flex-row items-center justify-center'
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
