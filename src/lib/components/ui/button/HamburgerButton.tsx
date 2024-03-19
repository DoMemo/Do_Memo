import { darkState } from 'lib/store/setting/DarkState'
import React from 'react'
import { useRecoilValue } from 'recoil'

const commonStyle = 'absolute left-0 w-full h-[2px] rounded-full duration-400 transition-all'

const HamburgerButton = ({isActive, setIsActive}: {
  isActive: boolean,
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const isDarkMode = useRecoilValue(darkState);

  const toggleActive = () => {
    setIsActive(!isActive);
  }
  return (
    <div className='relative w-[30px] h-[20px] duration-400'
      onClick={toggleActive}
    >
      <span className={`${commonStyle} ${isDarkMode ? 'bg-white' : 'bg-black'} top-0 ${isActive ? activeStyle(1) : ''}`}></span>
      <span className={`${commonStyle} ${isDarkMode ? 'bg-white' : 'bg-black'} top-[9px] ${isActive ? activeStyle(2) : ''}`}></span>
      <span className={`${commonStyle} ${isDarkMode ? 'bg-white' : 'bg-black'} bottom-0 ${isActive ? activeStyle(3) : ''}`}></span>
    </div>
  )
}

function activeStyle(nth: number) {
  switch (nth) {
    case 1:
      return 'top-0 translate-y-[8px] rotate-45'
    case 2:
      return 'opacity-0'
    case 3:
      return 'bottom-0 translate-y-[-10px] rotate-[-45deg]'
  }
}

export default HamburgerButton
