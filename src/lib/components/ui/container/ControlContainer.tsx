import React from 'react'

const ControlContainer = ({ isShadow, children }: {
  isShadow?: boolean;
  children?: React.ReactNode;
}) => {
  return (
    <div className={`absolute top-0 left-0 flex flex-row pb-2 gap-2 justify-center items-center w-full h-full bg-white ${isShadow && 'shadow-[0_-2px_30px_1px_rgba(0,0,0,0.1)]'} rounded-tr-3xl rounded-tl-3xl`}>
      {children}
    </div>
  )
}

export default ControlContainer
