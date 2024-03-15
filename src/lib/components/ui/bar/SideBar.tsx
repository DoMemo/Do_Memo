import React, { useEffect, useState } from 'react'

const SideBar = ({direction, isActive}: {
  direction: string;
  isActive: boolean;
}) => {
  const [ mounted, setMounted ] = useState(false);

  useEffect(() => {
    if(isActive) {
      setMounted(true);
    } else {
      setTimeout(() => {
        setMounted(false);
      }, 250);
    }
  }, [isActive] );
  
  return (
    <>
      {
        mounted && 
        <div className={`w-10/12 h-screen bg-white shadow-lg absolute top-0 ${returnPathStyle(direction)} ${isActive ? "animate-slide-left" : "animate-slide-right"} z-40`}>
          sidebar
        </div>
      }
    </>
  )
}

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
