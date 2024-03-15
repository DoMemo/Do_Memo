import React from 'react'

const commonStyle = 'absolute left-0 w-full h-[2px] bg-black rounded-full duration-400 transition-all'

const HamburgerButton = ({isActive, setIsActive}: {
  isActive: boolean,
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>
}) => {

  const toggleActive = () => {
    setIsActive(!isActive);
  }
  return (
    <div className='relative w-[30px] h-[20px] duration-400'
      onClick={toggleActive}
    >
      <span className={`${commonStyle} top-0 ${isActive ? activeStyle(1) : ''}`}></span>
      <span className={`${commonStyle} top-[8px] ${isActive ? activeStyle(2) : ''}`}></span>
      <span className={`${commonStyle} bottom-0 ${isActive ? activeStyle(3) : ''}`}></span>
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
      return 'bottom-0 translate-y-[-9px] rotate-[-45deg]'
  }
}

export default HamburgerButton
