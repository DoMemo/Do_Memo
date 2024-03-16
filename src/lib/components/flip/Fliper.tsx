import React from 'react'

const Fliper = ({ id, children }: {
  id: string;
  children: React.ReactNode;
}) => {
  return (
    <div id={id} className='fliper w-full'
    >
      {children}
    </div>
  )
}

export default Fliper
