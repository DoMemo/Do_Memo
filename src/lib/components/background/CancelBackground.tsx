import React from 'react'

const CancelBackground = ({ handleCancel }: {
  handleCancel: () => void;
}) => {
  return (
    <div
      className={`w-full h-full bg-gray-200 bg-opacity-30 absolute top-0 left-0 z-30`}
      onClick={handleCancel}
    >

    </div>
  )
}

export default CancelBackground
